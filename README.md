# OpenBench 开源基准

基于 [EVMBench](https://github.com/paradigmxyz/evmbench)（OpenAI × Paradigm）的智能合约安全扫描平台。

检测蜜罐合约、隐藏税率、Rug Pull 风险，并提供 AI 深度代码审计。

## 功能特性

- **合约地址扫描** — 输入合约地址，秒级返回安全评分和风险分析（基于 GoPlus Security API）
- **EVMBench AI 审计** — 对已开源验证的合约进行深度 AI 代码审计（Detect / Patch / Exploit 三种模式）
- **多链支持** — 以太坊（ETH）和 BNB Chain（BSC）
- **安全报告** — 蜜罐检测、持币分析、流动性信息、风险清单、漏洞详情
- **社交分享** — 支持 Twitter/X、Telegram、链接复制、原生 Web Share API
- **动态 OG 图片** — 赛博朋克风格的社交分享预览图（含评分、代币信息）
- **国际化** — 中文 / English 双语支持
- **SEO 优化** — 结构化数据（JSON-LD）、动态 Metadata、Favicon

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16（App Router + Turbopack） |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| 国际化 | next-intl v4 |
| AI 引擎 | OpenAI / Claude（代码审计） |
| 安全数据 | GoPlus Security API |
| 代码审计 | EVMBench（自托管） |
| 合约源码 | Etherscan / BSCScan API |

## 快速开始

### 环境要求

- Node.js 18+
- npm / yarn / pnpm

### 安装

```bash
git clone https://github.com/openbench1/openbench.git
cd openbench
npm install
```

### 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 API Key：

```env
# AI 引擎 API Key（至少填一个）
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# 默认 AI 引擎: "claude" 或 "openai"
AI_ENGINE=claude

# EVMBench API 地址（需自行部署）
EVMBENCH_API_URL=https://evmbench.yourdomain.com

# Etherscan / BSCScan API Key（获取已验证合约源码）
ETHERSCAN_API_KEY=
BSCSCAN_API_KEY=

# 应用地址
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
npm start
```

## EVMBench 后端部署

EVMBench 需要自行部署。项目提供了 Docker Compose 配置：

```bash
cd deploy/evmbench
# 在 .env 中设置 OPENAI_API_KEY
docker compose up -d
```

服务组件：
- **API 服务** — FastAPI，端口 1337
- **Worker** — 任务执行器
- **PostgreSQL** — 数据库
- **RabbitMQ** — 消息队列

详见 [EVMBench 官方仓库](https://github.com/paradigmxyz/evmbench)。

## 项目结构

```
src/
├── app/
│   ├── [locale]/          # 国际化路由
│   │   ├── scan/          # 扫描页
│   │   ├── audit/         # 审计页
│   │   ├── dashboard/     # 仪表盘
│   │   └── report/        # 报告页（动态 OG 图片）
│   └── api/               # API 路由
│       ├── scan/          # GoPlus 扫描
│       ├── audit/         # AI 审计
│       └── evmbench/      # EVMBench 集成
├── components/
│   ├── landing/           # 首页组件
│   ├── scan/              # 扫描组件
│   ├── report/            # 报告组件
│   ├── audit/             # 审计组件
│   └── ui/                # shadcn/ui 基础组件
├── lib/
│   ├── goplus/            # GoPlus API 客户端
│   ├── evmbench/          # EVMBench API 客户端
│   ├── etherscan/         # Etherscan API 客户端
│   └── ai/                # AI 引擎（Claude / OpenAI）
└── i18n/                  # 国际化配置
```

## 许可证

MIT

---

**OpenBench** — EVMBench-Powered Smart Contract Security Scanner
