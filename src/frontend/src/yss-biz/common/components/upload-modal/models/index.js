import lugiax from '@lugia/lugiax';
const uploadFilesModel = lugiax.register({
  model: 'uploadFilesModel',
  state: {
    visible: false,
    dataSource: []
  },
  mutations: {
    async: {},
    sync: {
      changeVisible(state, bool) {
        return state.set('visible', bool || false).set('dataSource', []);
      },
      saveDataSource(state, data) {
        return state.set('dataSource', data || []);
      }
    }
  }
});

export default uploadFilesModel;
