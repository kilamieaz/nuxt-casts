export const getData = async function (url, axios) {
  let response = await axios.get(url);
  return {
    data: response.data.data
  }
}

export const deserializeTags = function (tags) {
  tags.forEach(t => {
    t.video_ids = t.videos.map(v => v.id)
  })
}

export const deserializeVideos = function (videos) {
  videos.forEach(v => {
    v.tag_ids = v.tags.map(t => t.id);
    if (v.published_at) {
      v.published_at = new Date(v.published_at);
    }
    v.created_at = new Date(v.created_at);
  });
}
