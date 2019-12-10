export const state = () => ({
  videos: [],
  tags: [],
  currentVideo: {}
})

export const mutations = {
  SET_VIDEOS(state, videos) {
    state.videos = videos
  },
  SET_CURRENT_VIDEO(state, video) {
    state.currentVideo = video
  },
  SET_TAGS(state, tags) {
    state.tags = tags
  }
}

export const actions = {
  async loadAllVideos({
    commit
  }) {
    let {
      data: videos
    } = await getData('/videos', this.$axios);
    deserializeVideos(videos)
    commit('SET_VIDEOS', videos);
  },

  async loadAllTags({
    commit
  }) {
    let {
      data: tags
    } = await getData('/tags', this.$axios);
    deserializeTags(tags)
    commit('SET_TAGS', tags);
  }
}

const getData = async function (url, axios) {
  let response = await axios.get(url);
  return {
    data: response.data.data
  }
}

const deserializeTags = function (tags) {
  tags.forEach(t => {
    t.video_ids = t.videos.map(v => v.id)
  })
}

const deserializeVideos = function (videos) {
  videos.forEach(v => {
    v.tag_ids = v.tags.map(t => t.id);
  });
}
