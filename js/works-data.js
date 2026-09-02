/* 共享作品数据：主站目录、全屏弹窗、详情页共用。
   内容依据《郭映彤 - 新媒体运营》简历整理（2026-09）。
   图片素材到位后，把 ph-card 占位替换为 <img> 即可。 */
(function (global) {
  "use strict";

  const works = [
    {
      id: "w1",
      index: "01",
      category: "ACCOUNT OPERATION",
      title: "个人 IP 账号运营",
      en: "Personal IP Account",
      year: "2022 – 至今",
      client: "个人 IP · 抖音 / 小红书",
      role: "定位 · 选题 · 拍摄 · 剪辑",
      platform: "抖音 / 小红书",
      metrics: "粉丝 1w+ · 获赞 150w+ · 最高 186.2w",
      cover: "assets/w1-cover.jpg",
      links: [
        { platform: "抖音", url: "https://v.douyin.com/eNfP0gJBV4A/" },
        { platform: "小红书", url: "https://xhslink.cn/m/2FcI5Zhe3eH" },
      ],
      brief:
        "从 0 到 1 搭建个人 IP 账号（抖音、小红书双平台），独立完成账号定位、选题策划、脚本撰写、拍摄剪辑及标题封面优化。",
      longDesc:
        "账号承接头部游戏品牌推广，主导卖点提炼与推广视频创作，通过对游戏活动、剧情及角色二创进行软推广并引导下载，吸引新用户及老玩家回归。《头七怪谈》单平台推广浏览量达 300w+，《第五人格》150w+。运营期间整理评论、私信反馈与播放数据并做周度复盘，单条内容最高播放 186.2w、赞藏 23.4w，沉淀出一套可复用的内容方法论。",
      gallery: [
        { img: "assets/w1-douyin-home.jpg", caption: "抖音主页", stat: "v.douyin.com/eNfP0gJBV4A" },
        { img: "assets/w1-xhs-home.jpg", caption: "小红书主页", stat: "xhslink.cn/m/2FcI5Zhe3eH" },
        { img: "assets/w1-video-1.jpg", caption: "橙光《头七怪谈》二创宣传", stat: "浏览量 186.2w · 赞藏 23.4w" },
        { img: "assets/w1-video-2.jpg", caption: "网易《第五人格》二创宣传", stat: "浏览量 79.1w · 赞藏 10.7w" },
        { img: "assets/w1-video-3.jpg", caption: "游戏二创宣传", stat: "浏览量 36.5w · 赞藏 7.1w" },
        { img: "assets/w1-video-4.jpg", caption: "其他二创内容", stat: "浏览量 15.1w · 赞藏 2.6w" },
        { img: "assets/w1-video-5.jpg", caption: "其他二创内容", stat: "浏览量 14.5w · 赞藏 3w" },
      ],
    },
    {
      id: "w2",
      index: "02",
      category: "IP DESIGN",
      title: "IP 设计 · 云云",
      en: "YUNYUN IP Design",
      year: "2021",
      client: "SZTU 学生记者团",
      role: "IP 形象设计 · 文创设计",
      platform: "校园文创 · 公众号",
      metrics: "IP 形象 · 全校普及",
      cover: "assets/w2-cover.png",
      brief:
        "创作于 2021 年的 SZTU 学生记者团 IP 形象「云云 YUNYUN」：一个能通过观测生成自然生命的机器，承载机器齿轮的严谨与自然万物的生命力。",
      longDesc:
        "设计初衷是「小事分享，大事发声，目光所及之处因你而不同」。围绕云云搭建 IP 文创体系：2021「云云 GUIDE」深技大品宣指南，结合时令、节庆、时政热点与校园大事件，负责内页插画绘制及公众号活动编写发布，普及至全校师生；2024「云云」新年礼盒，包含 TO DO LIST 每日计划本、手机气囊支架、造云手记、明信片与保温杯，负责内页设计及产品设计。",
      gallery: [
        { img: "assets/w2-ip-01.png", caption: "IP 形象 · 云云 YUNYUN", stat: "2021 年创作 · 学生记者团" },
        { img: "assets/w2-ip-02.png", caption: "IP 形象 · 细节与延展", stat: "机器齿轮 × 自然生命力" },
        { img: "assets/w2-guide-1.jpg", caption: "云云 GUIDE · 内页插画", stat: "深技大品宣指南" },
        { img: "assets/w2-guide-2.png", caption: "云云 GUIDE · 品宣长图", stat: "时令 · 节庆 · 校园大事件" },
        { img: "assets/w2-gift-poster.png", caption: "图5 · 云云礼盒 图宣海报", stat: "2024 云云新年礼盒" },
        { img: "assets/w2-gift-campaign.png", caption: "图6 · 2024 云云新年礼盒 产品图宣", stat: "内页设计及产品设计" },
      ],
    },
    {
      id: "w3",
      index: "03",
      category: "BRAND COLLABORATION",
      title: "春日巡游 × 第五人格",
      en: "Spring Parade × Identity V",
      year: "2025.07",
      client: "春日巡游",
      role: "达人合作 · 模特出镜",
      platform: "抖音 / 小红书",
      metrics: "浏览量 100000+ · 互动 10000+ · 销售额 10W",
      cover: "assets/w3-pic-2.jpg",
      brief:
        "0 现金预算的达人合作项目：筛选 2 位中腰部二次元 / 第五人格垂类达人，以产品样品置换完成双平台种草推广，15 天周期内跑通圈层话题冷启动。",
      longDesc:
        "项目在 0 现金预算下完成：筛选 2 位 1w-10w 粉中腰部达人（二次元 / 第五人格垂类），以产品样品置换达成合作；内容采用开箱测评 + 上身实拍 + 卖点口播形式，抖音、小红书双平台分发，并统一挂载 #春日巡游 固定话题。15 天推广周期内，双平台内容总浏览量 100000+、总互动量（点赞 + 收藏 + 评论）10000+，完成品牌话题冷启动与圈层种草，带动单品销售额 10W，同时沉淀下一套可复用的二次元达人合作 SOP。",
      gallery: [
        { img: "assets/w3-pic-1.jpg", caption: "达人种草内容 · 记录一", stat: "抖音 / 小红书" },
        { img: "assets/w3-pic-2.jpg", caption: "达人种草内容 · 记录二", stat: "开箱测评 + 上身实拍" },
        { img: "assets/w3-pic-3.jpg", caption: "淘宝商品页 · 页面截图", stat: "电商 · 商品详情" },
        { img: "assets/w3-data-overview.jpg", caption: "后台数据整理 · 数据总览", stat: "浏览量 100000+ · 互动 10000+" },
        { img: "assets/w3-plan-v2.jpg", caption: "推广策划案 · 方案概览", stat: "春日巡游 × 第五人格 · 达人种草" },
      ],
    },
    {
      id: "w4",
      index: "04",
      category: "BRAND ADVERTISING",
      title: "斯丹德 · 豆腐灯广告",
      en: "STANDER Lamp Advertising",
      year: "2024.11",
      client: "斯丹德",
      role: "策划 · 文案 · 拍摄 · 剪辑",
      platform: "抖音 / 小红书",
      metrics: "浏览量 30w+ · 互动 2w+",
      cover: "assets/w4-ad.jpg",
      brief:
        "15 天单品爆款内容项目：主导创意策划、拍摄执行、文案撰写与后期剪辑，协同中腰部达人分发种草，落地抖音、小红书双平台。",
      longDesc:
        "斯丹德豆腐灯 3C 补光灯项目从创意到传播全链路由我主导：围绕迷你便携、RGB 全彩氛围、2700K-6500K 调光等卖点完成创意策划与文案撰写，独立执行实景拍摄、剪辑调色与封面优化；上线阶段统筹抖音、小红书双平台发布，协同 1w-10w 粉中腰部达人实测种草、转发分发，并根据播放与互动数据持续优化。项目单条推广内容总浏览量达 30w+、综合互动量 2w+，同时沉淀了可复用的 3C 数码品类种草脚本与拍摄模板。",
      gallery: [
        { img: "assets/w4-ad.jpg", caption: "抖音广告 · 成片截图", stat: "短视频 · 单条内容" },
        { img: "assets/w4-taobao.jpg", caption: "淘宝界面 · 商品页截图", stat: "电商 · 商品详情" },
        { img: "assets/w4-data.jpg", caption: "后台数据 · 效果截图", stat: "浏览量 30w+ · 互动 2w+" },
        { img: "assets/w4-plan-v2.jpg", caption: "推广策划案 · 方案概览", stat: "斯丹德 · 豆腐灯 · 达人种草" },
      ],
    },
    {
      id: "w5",
      index: "05",
      category: "OFFLINE EVENT",
      title: "线下快闪策划及活动引导",
      en: "Pop-up Planning & Guidance",
      year: "2025.06 – 2025.08",
      client: "奇谷米 · 晨光",
      role: "活动引导 · 现场执行 · 产品推广",
      platform: "线下 · 深圳",
      metrics: "单日接待 200+ · 客流千余人",
      cover: "assets/w5-cover.jpg",
      links: [
        { label: "查看活动链接", url: "https://xhslink.cn/o/4LmnPq35CId" },
      ],
      brief:
        "负责《全职高手》荣冕溯光与晨光次元集合（深圳站）两场线下快闪的现场执行与活动引导：前置梳理互动流程与节点，现场引导、产品介绍、互动合影与无料分发，突发状况即时处理。",
      longDesc:
        "《全职高手》荣冕溯光线下快闪（2025.06）：负责现场 IP 宣传与游戏互动执行，活动前梳理互动流程与时间节点，单日接待互动 200+ 人次，全部环节按节点完成、零遗漏。晨光次元快闪深圳站（2025.08）：负责现场活动引导、晨光 × 国漫衍生文具的产品介绍与推广，以及互动合影与无料分发，单日承接客流千余人，助力扩大晨光国民知名度。",
      gallery: [
        { img: "assets/w5-g1.jpg", caption: "《全职高手》荣冕溯光 · 活动详情海报", stat: "2025.06 · 深圳奇谷米" },
        { img: "assets/w5-g2.jpg", caption: "《全职高手》荣冕溯光 · 活动快照", stat: "2025.06" },
        { img: "assets/w5-g3.jpg", caption: "《全职高手》荣冕溯光 · 活动现场策划", stat: "流程与环节梳理" },
        { img: "assets/w5-g4.jpg", caption: "晨光次元集合 · 线下快闪海报", stat: "2025.08 · 深圳站" },
        { img: "assets/w5-g5.jpg", caption: "晨光次元集合 · 线上宣传视频", stat: "2025.08" },
        { img: "assets/w5-g6-34c.jpg", caption: "晨光次元集合 · 官方采访视频", stat: "2025.08" },
      ],
    },
    {
      id: "w6",
      index: "06",
      category: "CAMPUS MEDIA",
      title: "校园公众号运营",
      en: "Campus Official Account",
      year: "2022 – 2025",
      client: "学生记者团",
      role: "策划 · 编辑 · 排版",
      platform: "微信公众号",
      metrics: "30+ 篇内容 · 浏览量 100w+",
      cover: "assets/w6-cover.png",
      galleryLinks: [
        { label: "公众号文章 01", url: "https://mp.weixin.qq.com/s/BSjNeCttNu5ItX79uTVNWA" },
        { label: "公众号文章 02", url: "https://mp.weixin.qq.com/s/K2BoF6f3s7kCMR-h_tDOdA" },
        { label: "公众号文章 03", url: "https://mp.weixin.qq.com/s/MbpYuek1_zF8F61VwhfLIA" },
      ],
      brief:
        "运营学校官方公众号，主导内容策划、稿件编辑、视觉排版与发布维护，建立发布排期并用阅读数据复盘选题方向。",
      longDesc:
        "在校园场景里练就了内容生产的完整手感：负责公众号内容策划、稿件编辑、视觉排版与发布维护，建立内容发布排期，定期整理阅读数据复盘选题方向，并配合校园文创策划与推广。累计产出 30+ 篇内容、浏览量 100w+，为校园文创供稿 50+ 张，有效提升了校园品牌传播效果。",
      gallery: [
        { img: "assets/w6-g1.png", caption: "公众号排版 · 图1", stat: "图文编辑 · 视觉统一" },
        { img: "assets/w6-g2.png", caption: "公众号排版 · 图2", stat: "图文编辑 · 视觉统一" },
        { img: "assets/w6-g3.png", caption: "公众号排版 · 图3", stat: "图文编辑 · 视觉统一" },
        { img: "assets/w6-g4.png", caption: "公众号排版 · 图4", stat: "图文编辑 · 视觉统一" },
        { img: "assets/w6-g5.png", caption: "公众号排版 · 图5", stat: "图文编辑 · 视觉统一" },
        { img: "assets/w6-g6.png", caption: "公众号排版 · 图6", stat: "图文编辑 · 视觉统一" },
        { img: "assets/w6-g7.png", caption: "公众号排版 · 图7", stat: "图文编辑 · 视觉统一" },
      ],
    },
  ];

  global.PORTFOLIO_WORKS = works;
  global.PORTFOLIO_WORK_MAP = works.reduce((map, w) => {
    map[w.id] = w;
    return map;
  }, {});
})(window);
