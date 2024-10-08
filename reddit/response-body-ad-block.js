// source: https://raw.githubusercontent.com/fmz200/wool_scripts/774ca5d0c9b5f812a9dd5c4b9629f5b78602a055/Scripts/reddit.js
// Reddit过滤推广，关NSFW提示

let body;
try {
  body = JSON.parse($response.body.replace(/"isNsfw":true/g, '"isNsfw":false'))
  if (body.data?.children?.commentsPageAds) {
    body.data.children.commentsPageAds = []
  }
  for (const [k, v] of Object.entries(body.data)) {
    if (v?.elements?.edges) {
      body.data[k].elements.edges = v.elements.edges.filter(
        i =>
          !['AdPost'].includes(i?.node?.__typename) &&
          !i?.node?.cells?.some(j => j?.__typename === 'AdMetadataCell') &&
          !i?.node?.adPayload
      );
    }
  }

} catch (e) {
  console.log(e);
} finally {
  $done(body ? {body: JSON.stringify(body)} : {});
}
