import Loadable from 'react-loadable';
import Loading from 'yss-biz/common/components/loading';

export default (opts = {}) => {
  try {
    opts.loader().then();
    return Loadable(
      Object.assign(opts, {
        loading: Loading,
        delay: 300,
        timeout: 6000
      })
    );
  } catch (e) {
    return opts.loader;
  }
};
