'use strict';

const SchexJob = require('egg-schex').SchexJob;

const init_ctx = {
  test: 0, // 任务属性
  subJob: {
    cnt: 0, // 子任务属性
  },
};

class UpdateCache extends SchexJob {

  constructor(ctx, sc, job) {
    super(ctx, sc, job);

    this.subJobName = job.name + '-sub_t'; // 子任务名称
    this.cnt = 1;
  }

  // 任务初始化函数，在这里设置初始化数据
  onActInit() {
    this._job.ctx = Object.assign({}, init_ctx);
    this.logger.info('[schex] sample job AddJob init');
  }

  /** 任务处理函数 */
  async onActRun() {
    const { ctx, cfg } = this._job; // 获取任务的 ctx
    const { ctx: ectx, app } = this; // 获取 egg 的 ctx 和 app

    console.log('----------', this._job.name, ectx.helper.dateFormat(), cfg.path);
    // console.log(this.ctx, this.app);
    this._job.msg = `${ctx.test} `;
  }

  async onActStop() {
    this._job.ctx = init_ctx;
  }
}

module.exports = UpdateCache;
