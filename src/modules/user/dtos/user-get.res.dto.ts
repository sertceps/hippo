class WebsiteDto {
  github?: string;

  twitter?: string;

  zhihu?: string;

  weibo?: string;

  gitee?: string;

  personal_websites?: string[];
}

export class UserGetResDto {
  user_name: string;

  email: string;

  birth?: Date;

  gender?: string;

  background?: string;

  avatar?: string;

  websites?: WebsiteDto;

  description?: string;
}
