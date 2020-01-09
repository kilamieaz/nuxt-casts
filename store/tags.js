// import Api from "@/services/api";
import {
  getData,
  deserializeVideos,
  deserializeTags
} from '@/utils/store-utils'

import Vue from 'vue';

export const state = () => ({
  tags: [],
});

export const mutations = {
  SET_TAGS(state, tags) {
    state.tags = tags;
  },
  CONNECT_TAG_TO_VIDEO(state, {
    tag,
    video
  }) {
    let videoFromState = this.state.videos.videos.find(v => v.id == video.id);
    let tagFromState = state.tags.find(t => t.id == tag.id);
    Vue.set(videoFromState, 'tags', videoFromState.tags.concat(tag));
    Vue.set(tagFromState, 'videos', tagFromState.videos.concat(video));
    // videoFromState.tags = videoFromState.tags.concat(tag);
    // tagFromState.videos = tagFromState.videos.concat(video);
  },
  DISCONNECT_TAG_FROM_VIDEO(state, {
    tag,
    video
  }) {
    let videoFromState = this.state.videos.videos.find(v => v.id == video.id);
    let tagFromState = state.tags.find(t => t.id == tag.id);

    Vue.set(videoFromState, 'tags', videoFromState.tags.filter(t => t.id != tag.id));
    Vue.set(tagFromState, 'videos', tagFromState.videos.filter(v => v.id != video.id));
  },
  CREATE_TAG(state, {
    tag
  }) {
    let tags = state.tags.concat(tag);
    state.tags = tags;
  },
  UPDATE_TAG(state, {
    tag
  }) {
    let updateTag = state.tags.find(t => t.id == tag.id)
    updateTag.name = tag.name
  },
  DELETE_TAG(state, {
    tag
  }) {
    state.tags = state.tags.filter(t => t.id != tag.id)
  }
};

export const actions = {
  async loadAll({
    commit
  }) {
    let {
      data: tags
    } = await getData('/tags?include=videos', this.$axios);
    deserializeTags(tags)
    commit('SET_TAGS', tags);
  },
  async connectToVideo({
    commit
  }, {
    tag,
    video
  }) {
    await this.$axios.post(`/videos/${video.id}/tags`, {
      tag_id: tag.id
    });
    commit('CONNECT_TAG_TO_VIDEO', {
      tag,
      video
    });
  },
  async disconnectFromVideo({
    commit
  }, {
    tag,
    video
  }) {
    await this.$axios.delete(`/videos/${video.id}/tags/${tag.id}`);
    commit('DISCONNECT_TAG_FROM_VIDEO', {
      tag,
      video
    });
  },
  async create({
    commit
  }, {
    name
  }) {
    // response tag with videos
    let response = await this.$axios.post(`/tags`, {
      name
    });
    let createdTag = response.data.data;
    commit('CREATE_TAG', {
      tag: createdTag
    })
    return createdTag
  },
  async update({
    commit
  }, {
    tag
  }) {
    this.$axios.put(`/tags/${tag.id}`, {
      name: tag.name
    })
    commit('UPDATE_TAG', {
      tag
    })
  },
  async delete({
    commit
  }, {
    tag
  }) {
    this.$axios.delete(`/tags/${tag.id}`)
    commit('DELETE_TAG', {
      tag
    })
  }
};

export const getters = {
  get: state => id => {
    return state.tags.find(tag => tag.id == id);
  },
}
