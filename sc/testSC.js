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
    this.logger.info('[schex] sample job init');
  }

  /** 任务处理函数 */
  async onActRun() {
    const { ctx, cfg } = this._job; // 获取任务的 ctx
    const { ctx: ectx, app } = this; // 获取 egg 的 ctx 和 app

    console.log(cfg);

    this.logger.info('schex sample logger');
    ctx.test += 1;
    console.log('----------', this._job.name, ectx.helper.dateFormat(), ctx.test);
    // console.log(this.ctx, this.app);
    this._job.msg = `${ctx.test} `;

    if (ctx.test === 2 || ctx.test === 17) { // 启动子任务
      this.addSubJob(this.subJobName, {
        cron: '*/2 * * * * *',
        switch: 1,
      });
    } else if (ctx.test === 15 || ctx.test === 19) { // 关闭子任务
      this.stopSubJob(this.subJobName, `Stop ${this.subJobName}`);
    }

    if (this.sc.isHandleCtlMsg() === false) {

      if (ctx.test < 2) {
        const retInfo = await this.sc.getJobStatus();
        console.log('handle ret', retInfo);
      } else if (ctx.test === 2) {
        const retInfo = await this.sc.addJob(
          'testAddJob',
          {
            cron: '*/5 * * * * *',
            fun: './sc/testAddJob.js',
            switch: false,
          },
          {
            path: 'this is path from cfg',
          }
        );
        console.log('handle ret', retInfo);
        // const retInfo = await this.sc.startJob('testAddJob');
        // console.log('handle ret', retInfo);
      } else if (ctx.test === 4) {
        const retInfo = await this.sc.updateJob(
          'testAddJob',
          {
            cron: '*/5 * * * * *',
            fun: './sc/testAddJob.js',
            switch: true,
          },
          {
            path: 'this is path from cfg 12',
          }
        );
        console.log('handle ret', retInfo);

      } else if (ctx.test === 8) {
        const retInfo = await this.sc.stopJob('testAddJob');
        console.log('handle ret', retInfo);
      } else if (ctx.test === 12) {
        const retInfo = await this.sc.deleteJob('testAddJob');
        console.log('handle ret', retInfo);
      }

    }


  }

  async onActStop() {
    this._job.ctx = init_ctx;
  }

  /** 子任务处理
   * @param {Object} job 子任务结构
  */
  async onActSubRun(job) {
    // console.log('onActSubRun-1:', job.name);

    this._job.ctx.subJob.cnt++;
    console.log('--- ctx=', this._job.ctx);
    job.msg = `${this._job.ctx.subJob.cnt}`;
  }

  /** 子任务停止
   * @param {Object} job 子任务结构
   */
  async onActSubStop(job) {
    // console.log('onActSubStop-1:', job.name);
    this._job.ctx.subJob.cnt = 0;
  }
}

module.exports = UpdateCache;
