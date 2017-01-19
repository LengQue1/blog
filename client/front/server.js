const isProd = process.env.NODE_ENV === 'production'
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const serialize = require('serialize-javascript')
let config = require('./server/config');

function parseHTML (template) {
  const contentMarker = '{{ APP }}'
  const i = template.indexOf(contentMarker)
  return {
    head: template.slice(0, i),
    tail: template.slice(i + contentMarker.length)
  }
}

const parseMeta = (head, context) => {
  const title = context.title || ''
  const description = context.description || ''
  const keywords = context.keywords || ''
  head = head.replace(/(<title>)(.*?)(<\/title>)/, `$1${title}$3`)
  head = head.replace(/(<meta name=description content=")(.*?)(">)/, `$1${description}$3`)
  head = head.replace(/(<meta name=keywords content=")(.*?)(">)/, `$1${keywords}$3`)
  return head
}


let app = express();
let indexHTML;
let renderer;
if (isProd) {
  const bundlePath = resolve('./dist/server-bundle.js');
  renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'));
} else {
  require('./build/setup-dev-server')(app, {
    indexUpdated: index => {
      indexHTML = parseHTML(index);
    },
    bundleUpdated: bundle => {
      renderer = createRenderer(bundle);
    }
  })
}


function createRenderer (bundle) {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

!isProd && app.use((req, res, next) => {
  console.log(`${req.method} ${decodeURIComponent(req.url)}`)
  return next()
});

app.use('/dist', express.static(resolve('./dist'), {
  fallthrough: false
}));
app.use('/static', express.static(resolve('./dist/static'), {
  fallthrough: false
}));


app.get('*', (req, res) => {
  
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }
  
  let s = Date.now()
  const context = {
    url: req.url
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  const renderStream = renderer.renderToStream(context);

  renderStream.once('data', () => {
    res.write(parseMeta(indexHTML.head, context));
  });
  
  renderStream.on('data', chunk => {
    res.write(chunk)
  });
  
  renderStream.on('end', () => {
    if(context.initialState){
      res.write(
         `<script>window.__INITIAL_STATE__=${
            serialize(context.initialState, {isJSON: true})
            }</script>`
      )
    }

    res.end(indexHTML.tail)
    !isProd && console.log(`whole request: ${Date.now() - s}ms`)
    !isProd && console.log('---------------')
  })
  
  renderStream.on('error', err => {
    if(err && err.code == '404'){
      res.status(404).end('404, Page Not Found')
      return
    }
    res.status(500).end('500 Internal Error')
    console.log(err)
  });
});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});
