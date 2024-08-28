// source: https://raw.githubusercontent.com/Zz1xuan/ONE/main/Script/AD/reddit.js 
//Reddit 过滤推广, 关 subreddit 的 NSFW 提示

let modified;
let body;
try {
  body = JSON.parse($response.body.replace(/\"isNsfw\"/gi, '"_isNsfw"'));
  if (body?.data?.subredditInfoByName?.elements?.edges) {
    body.data.subredditInfoByName.elements.edges =
      body.data.subredditInfoByName.elements.edges.filter(
        i => i?.node?.__typename !== 'AdPost'
      );
    modified = true;
  } else if (body?.data?.home?.elements?.edges) {
    body.data.home.elements.edges = body.data.home.elements.edges.filter(
      i => i?.node?.__typename !== 'AdPost'
    );
    modified = true;
  } else if (body?.data?.homeV3?.elements?.edges) {
    body.data.homeV3.elements.edges = body.data.homeV3.elements.edges.filter(
      i => !i?.node?.cells?.some(j => j?.__typename === 'AdMetadataCell')
    );
    body.data.homeV3.elements.edges = body.data.homeV3.elements.edges.map(
      edge => {
      if (edge.node.adPayload) {
        edge.node.adPayload = null;
      }
      return edge;
      }
    );
    modified = true;
  } else if (body?.data?.popularV3?.elements?.edges) {
    body.data.popularV3.elements.edges = body.data.popularV3.elements.edges.map(
      edge => {
      if (edge.node.adPayload) {
        edge.node.adPayload = null;
      }
      return edge;
      }
    );
    modified = true;
  } else if ($response.body.includes('"isNsfw"')) {
    modified = true;
  }
} catch (e) {
  console.log(e)
} finally {
  $done(modified ? { body: JSON.stringify(body) } : {});
}
