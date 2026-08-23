/**
 * 西高地白梗 — 全局数据中心
 * 统一管理所有页面数据，支持计算属性和响应式
 */

/* ===== 首页轮播 ===== */
export const heroBannerSlides = [
  { img: '/images/眼镜1.png', slogan: '小小的身体，大大的快乐', sub: '西高地白梗 — 乐观、勇敢、忠诚的完美伴侣' },
  { img: '/images/眼镜2.png', slogan: '戴眼镜的西高地，萌力加倍', sub: '可爱到犯规，治愈你每一天' }
]

/* ===== 快速入口 ===== */
export const featureEntries = [
  { icon: 'gallery', title: '西高地图鉴', desc: '精选西高地相册，欣赏纯白精灵的可爱瞬间', to: '/gallery' },
  { icon: 'care', title: '养护百科', desc: '洗护、饮食、泪痕、运动，全方位养护指南', to: '/care' },
  { icon: 'diary', title: '成长日记', desc: '0-12个月幼犬成长时间轴，记录每一个重要阶段', to: '/growth' },
  { icon: 'test', title: '养前测试', desc: '5道选择题测测你是否适合养西高地', to: '/test' }
]

/* ===== 关于西高地 ===== */
export const aboutStats = [
  { value: '12-16年', label: '平均寿命' },
  { value: '6.5-8.5kg', label: '成年体重' },
  { value: '25-28cm', label: '成年肩高' },
  { value: '纯白', label: '被毛颜色' }
]

export const aboutBlocks = [
  {
    tag: '起源',
    title: '来自苏格兰高地的白色精灵',
    desc: '西高地白梗（West Highland White Terrier）起源于19世纪的苏格兰西部高地，最初被培育用于猎捕狐狸和水等小型猎物。它们纯白的被毛让猎人在野外能轻易辨认，勇敢无畏的性格使它们在狩猎中表现出色。经过百年培育，如今已成为最受欢迎的家庭伴侣犬之一。',
    img: '/images/配图1.png',
    alt: '西高地白梗'
  },
  {
    tag: '性格',
    title: '乐观、勇敢、忠诚的完美伴侣',
    desc: '西高地天性活泼开朗，充满好奇心，同时也极为独立自信。它们对主人极度忠诚，与孩子和其他宠物都能友好相处。虽然体型娇小，但拥有一颗大心脏——面对比自己大得多的对手也毫不退缩，是真正的小个子勇士。',
    img: '/images/配图3.png',
    alt: '西高地性格',
    reverse: true
  }
]

/* ===== 每日治愈文案 ===== */
export const dailyWords = [
  { text: '西高地的快乐很简单：一个球、一个你、一整天。', author: '西友日记' },
  { text: '当你觉得世界太复杂时，看看西高地纯白的毛发，世界就简单了。', author: '匿名' },
  { text: '养一只西高地，就是给生活装了一个永不停机的快乐引擎。', author: '西高地铲屎官' },
  { text: '它们用最纯粹的眼神告诉你：你值得被无条件地爱着。', author: '宠物心理师' },
  { text: '每一个清晨，西高地的摇尾巴都在说：今天会是美好的一天！', author: '早安西友' },
  { text: '西高地教会我们的，是用最简单的方式表达最深的爱。', author: '西友日记' }
]

/* ===== 养护百科 ===== */
export const careTabs = [
  { key: 'wash', label: '洗护指南', icon: 'shower' },
  { key: 'diet', label: '饮食建议', icon: 'food' },
  { key: 'tears', label: '泪痕护理', icon: 'eye' },
  { key: 'exercise', label: '运动计划', icon: 'run' }
]

export const careContents = {
  wash: {
    title: '西高地洗护指南',
    items: [
      '建议每2-3周洗一次澡，过于频繁会破坏皮肤油脂平衡',
      '使用温和的宠物专用香波，避免人用洗发水刺激皮肤',
      '洗澡前先梳理毛发，去除打结和脱落毛发',
      '水温控制在37-39°C，从背部开始冲洗，避免水进入耳朵',
      '洗后彻底吹干，特别注意腋下和腹股沟等易潮湿部位',
      '定期修剪脚底毛和肛门周围毛发，保持卫生'
    ]
  },
  diet: {
    title: '西高地饮食建议',
    items: [
      '选择优质小型犬专用粮，蛋白质含量建议在25%-30%',
      '每日喂食2次，成犬每餐约100-150g',
      '避免喂食巧克力、洋葱、葡萄等对犬类有毒的食物',
      '确保充足的清洁饮水，每日更换',
      '可适量添加胡萝卜、西兰花等蔬菜作为零食',
      '注意控制零食量，防止肥胖导致关节问题'
    ]
  },
  tears: {
    title: '泪痕护理方法',
    items: [
      '每日用温水湿润的棉片轻轻擦拭眼角，保持眼周干燥',
      '定期修剪眼周毛发，避免毛发刺激眼睛导致流泪',
      '检查是否有倒睫或眼睑内翻，如有需要及时就医',
      '饮食中避免过多盐分和添加剂，选择低敏配方狗粮',
      '可使用宠物专用泪痕清洁液，但要避免产品进入眼睛',
      '保持饮用水清洁，有些狗狗对自来水中的矿物质敏感'
    ]
  },
  exercise: {
    title: '西高地运动计划',
    items: [
      '每日至少30-45分钟户外活动，分早晚两次为宜',
      '适合的运动：散步、慢跑、接球游戏、嗅闻探索',
      '西高地天性活泼好动，需要足够的运动消耗精力',
      '避免在高温时段进行剧烈运动',
      '幼犬注意控制运动量，避免过度运动影响骨骼发育',
      '每周安排1-2次与其他狗狗的社交玩耍时间'
    ]
  }
}

/* ===== 成长时间轴 ===== */
export const growthStages = [
  { month: 1, title: '新生儿期', desc: '出生后第一周，眼睛和耳朵尚未打开，完全依赖母乳。体重约200-300g。', weight: '200-300g', feeding: '纯母乳' },
  { month: 2, title: '过渡期', desc: '眼睛睁开，开始学走路。可以开始添加辅食，逐步断奶。', weight: '0.8-1.2kg', feeding: '母乳+幼犬奶粉' },
  { month: 3, title: '社会化关键期', desc: '疫苗接种开始，可以接触新环境。好奇心最强，适合开始基础训练。', weight: '1.5-2.5kg', feeding: '幼犬粮3-4次/日' },
  { month: 4, title: '换牙期', desc: '乳牙开始脱落，恒牙萌出。需要提供磨牙玩具，注意咬合发育。', weight: '2.5-3.5kg', height: '15-18cm', feeding: '幼犬粮3次/日' },
  { month: 6, title: '快速生长期', desc: '身体快速发育，性格逐渐稳定。可开始进阶训练，绝育手术可考虑。', weight: '4-5.5kg', height: '20-23cm', feeding: '幼犬粮2-3次/日' },
  { month: 9, title: '青春期', desc: '接近成年体型，性格测试期。需要持续训练和社交，保持耐心。', weight: '5.5-7kg', height: '23-25cm', feeding: '成犬粮2次/日' },
  { month: 12, title: '成年期', desc: '正式进入成年期，体型基本定型。性格趋于稳定，可以开始更多户外活动。', weight: '6.5-8.5kg', height: '25-28cm', feeding: '成犬粮2次/日' }
]

/* ===== 养前测试 ===== */
export const testQuestions = [
  {
    question: '你每天能陪伴狗狗的时间大约是多少？',
    options: [
      { label: '少于2小时', score: 1 },
      { label: '2-4小时', score: 3 },
      { label: '4-8小时', score: 4 },
      { label: '8小时以上', score: 5 }
    ]
  },
  {
    question: '你的居住环境是？',
    options: [
      { label: '无独立空间的合租', score: 1 },
      { label: '小型公寓', score: 3 },
      { label: '中型公寓/有阳台', score: 4 },
      { label: '带院子的独立住宅', score: 5 }
    ]
  },
  {
    question: '你对养狗的经济预算如何？',
    options: [
      { label: '每月300元以内', score: 1 },
      { label: '每月300-600元', score: 3 },
      { label: '每月600-1000元', score: 4 },
      { label: '每月1000元以上', score: 5 }
    ]
  },
  {
    question: '你对狗狗日常护理的了解程度？',
    options: [
      { label: '完全不了解', score: 1 },
      { label: '了解一些基础知识', score: 3 },
      { label: '做过功课，比较了解', score: 4 },
      { label: '有养狗经验，很熟悉', score: 5 }
    ]
  },
  {
    question: '如果狗狗生病需要就医，你会？',
    options: [
      { label: '先观察几天再说', score: 1 },
      { label: '网上咨询后决定', score: 2 },
      { label: '尽快带去宠物医院', score: 4 },
      { label: '立即就医，有固定兽医', score: 5 }
    ]
  }
]

/* ===== 初始留言 ===== */
export const initialComments = [
  { id: '1', user: '西高地铲屎官', avatar: '🐶', text: '我家小白已经3岁了，每天最期待的就是下班回家看到它摇尾巴的样子！西高地真的是最治愈的狗狗。', images: [], time: '2小时前', likes: 24, liked: false },
  { id: '2', user: '爱宠达人', avatar: '🐾', text: '刚给豆豆洗完澡，毛发蓬松得像个棉花糖。分享一张洗完澡的萌照！', images: [], time: '5小时前', likes: 18, liked: false },
  { id: '3', user: '西友小明', avatar: '🦴', text: '带我家西高地去公园玩，遇到了一只金毛，两只狗狗玩得可开心了。西高地的社交能力真的很强！', images: [], time: '昨天', likes: 32, liked: true }
]
