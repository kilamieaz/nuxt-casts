// import Api from "@/services/api";
import {
  getData,
  deserializeVideos,
  deserializeTags
} from '@/utils/store-utils'

export const state = () => ({
  videos: [],
});

export const mutations = {
  SET_VIDEOS(state, videos) {
    state.videos = videos;
  },
  CREATE_VIDEO(state, video) {
    let videos = state.videos.concat(video);
    state.videos = videos;
  },
  DELETE_VIDEO(state, videoId) {
    let videos = state.videos.filter(v => v.id != videoId);
    state.videos = videos;
  },
  EDIT_VIDEO(state, video) {
    state.videos.forEach(v => {
      if (v.id == video.id) {
        v = video;
      }
    })
  },
};

export const actions = {
  async loadAll({
    commit
  }) {
    let {
      data: videos
    } = await getData('/videos', this.$axios);
    deserializeVideos(videos)
    commit('SET_VIDEOS', videos);
  },
  async create({
    commit
  }, video) {
    let response = await this.$axios.post('/videos', video);
    let savedVideo = response.data.data;
    commit('CREATE_VIDEO', savedVideo);
    return savedVideo;
  },
  async delete({
    commit
  }, video) {
    //delete video on server
    await this.$axios.delete(`/videos/${video.id}`);
    //delete video in state
    commit('DELETE_VIDEO', video.id)
  },
  async edit({
    commit
  }, video) {
    return await this.$axios.put(`/videos/${video.id}`, video)
      .then(response => {
        commit('EDIT_VIDEO', response.data.data);
        return response.data.data;
      });
  },
}

export const getters = {
  getVideo: state => id => {
    return state.videos.find(video => video.id == id);
  },
}