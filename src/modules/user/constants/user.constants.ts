export enum UserRole {
  /** 超级管理员
   * (文章、用户)编辑、删除
   */
  Super = 'super',

  /** 管理员
   *  编辑、删除文章（回收站）
   */
  Admin = 'admin',

  /** 普通用户
   * 查看，发布文章
   * 编辑自己文章
   */
  Normal = 'normal'
}
