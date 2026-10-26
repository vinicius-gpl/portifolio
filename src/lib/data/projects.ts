export type ProjectImage = {
	title: { en: string; 'pt-br': string } | string;
	url: string;
};

export type ProjectStatus = 'done' | 'pre-release' | 'in-progress' | 'idea';

export type ProjectHighlight = {
	title: { en: string; 'pt-br': string };
	body: { en: string; 'pt-br': string };
};

export type Project = {
	id: string;
	title: string;
	desc: { en: string; 'pt-br': string };
	tech: string[];
	github?: string;
	demo?: string;
	docs?: string;
	preview?: string;
	previewType?: 'desktop' | 'mobile';
	/** Real pixel dimensions of `preview`, used to size the desktop frame with no crop/letterbox. */
	previewDimensions?: { width: number; height: number };
	images?: ProjectImage[];
	status: ProjectStatus;
	highlights?: ProjectHighlight[];
};

export const PROJECTS: Project[] = [
	{
		id: 'acerola-android',
		title: 'Acerola Android',
		status: 'pre-release',
		desc: {
			en: 'Android manga reader built with Kotlin and Jetpack Compose. Scans local storage, parses CBZ/CBR, and auto-fetches metadata from MangaDex and AniList.',
			'pt-br':
				'Leitor de mangá para Android em Kotlin e Jetpack Compose. Escaneia armazenamento local, processa CBZ/CBR e busca metadados no MangaDex/AniList.'
		},
		tech: ['Kotlin', 'Jetpack Compose', 'Rust', 'Iroh', 'Hilt', 'MangaDex API', 'AniList API'],
		github: 'https://github.com/vinicius-gpl/acerola-reader/tree/main/acerola/android',
		docs: 'https://docs.acerola.app/',
		preview:
			'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/android/banner/acerola-android-solo.png',
		previewDimensions: { width: 1920, height: 1080 },
		images: [
			{
				title: { en: 'Home', 'pt-br': 'Início' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/android/prints/home-screen.png'
			},
			{
				title: { en: 'Reader', 'pt-br': 'Leitor' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/android/prints/reader-screen.png'
			},
			{
				title: { en: 'Chapters', 'pt-br': 'Capítulos' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/android/prints/chapters-screen.png'
			},
			{
				title: { en: 'History', 'pt-br': 'Histórico' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/android/prints/history-screen.png'
			},
			{
				title: { en: 'Settings', 'pt-br': 'Configurações' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/android/prints/config-screen.png'
			},
			{
				title: { en: 'Network', 'pt-br': 'Rede' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/android/prints/network-screen.png'
			}
		],
		highlights: [
			{
				title: { en: 'Storage Scanner', 'pt-br': 'Scanner de Armazenamento' },
				body: {
					en: 'Indexes designated storage directories and builds a searchable library without requiring manual user refreshes.',
					'pt-br': 'Indexa diretórios de armazenamento e constrói a biblioteca de forma automática.'
				}
			},
			{
				title: { en: 'Metadata Fetcher', 'pt-br': 'Buscador de Metadados' },
				body: {
					en: 'Fetches covers, synopses, authors, and chapter indexes from MangaDex, AniList, and embedded ComicInfo data.',
					'pt-br':
						'Obtém capas, sinopses, autores e capítulos via MangaDex, AniList e dados ComicInfo incorporados.'
				}
			},
			{
				title: { en: 'Format Processing', 'pt-br': 'Processamento de Formatos' },
				body: {
					en: 'Direct CBZ/CBR archive extraction and automated on-demand PDF conversion on first launch.',
					'pt-br': 'Extração direta de arquivos CBZ/CBR e conversão automática sob demanda de PDF.'
				}
			},
			{
				title: { en: 'Reader Engine', 'pt-br': 'Engine de Leitura' },
				body: {
					en: 'Supports paginated horizontal/vertical modes and continuous webtoon scroll with automatic page persistence.',
					'pt-br':
						'Oferece leitura paginada horizontal/vertical e scroll contínuo de webtoon com salvamento automático de posição.'
				}
			}
		]
	},
	{
		id: 'acerola-desktop',
		title: 'Acerola Desktop',
		status: 'in-progress',
		desc: {
			en: 'Cross-platform desktop comic reader built with Rust and Tauri. Reads CBZ, CBR and PDF files, manages a local library, streams pages over HTTP to mobile, and connects to the AI translator plugin.',
			'pt-br':
				'Leitor de quadrinhos desktop multiplataforma em Rust e Tauri. Lê CBZ, CBR e PDF, gerencia biblioteca local, faz streaming de páginas via HTTP para celular e conecta ao plugin de tradução com IA.'
		},
		tech: ['Rust', 'Tauri v2', 'Svelte 5', 'TypeScript', 'Iroh', 'Tailwind'],
		github: 'https://github.com/vinicius-gpl/acerola-reader/tree/main/acerola/desktop',
		docs: 'https://docs.acerola.app/',
		preview:
			'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/desktop/banner/acerola-desktop-solo.png',
		previewDimensions: { width: 1920, height: 1080 },
		images: [
			{
				title: { en: 'Home', 'pt-br': 'Início' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/desktop/prints/home-screen.png'
			},
			{
				title: { en: 'Reader', 'pt-br': 'Leitor' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/desktop/prints/reader-screen.png'
			},
			{
				title: { en: 'Chapters', 'pt-br': 'Capítulos' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/desktop/prints/chapters-screen.png'
			},
			{
				title: { en: 'History', 'pt-br': 'Histórico' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/desktop/prints/history-screen.png'
			},
			{
				title: { en: 'Settings', 'pt-br': 'Configurações' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/desktop/prints/config-screen.png'
			},
			{
				title: { en: 'Network', 'pt-br': 'Rede' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-reader/main/docs/github/ptbr/desktop/prints/network-screen.png'
			}
		],
		highlights: [
			{
				title: { en: 'Native Reader', 'pt-br': 'Leitor Nativo' },
				body: {
					en: 'Rust backend extracts CBZ, CBR and PDF pages with an LRU byte-budget cache — pages stay in memory for smooth back-and-forth navigation.',
					'pt-br':
						'Backend em Rust extrai páginas de CBZ, CBR e PDF com cache LRU por bytes — páginas ficam em memória para navegação fluida em ambas as direções.'
				}
			},
			{
				title: { en: 'Mobile Server', 'pt-br': 'Servidor para Celular' },
				body: {
					en: 'Starts a local Axum HTTP server so the Android app reads your PC library over Wi-Fi without copying a single file.',
					'pt-br':
						'Sobe um servidor HTTP Axum local para o app Android ler a biblioteca do PC via Wi-Fi sem copiar nenhum arquivo.'
				}
			},
			{
				title: { en: 'AI Translation Plugin', 'pt-br': 'Plugin de Tradução com IA' },
				body: {
					en: 'Sends a CBZ to acerola-translator and streams real-time progress back via SSE — translated file downloads automatically when done.',
					'pt-br':
						'Envia um CBZ para o acerola-translator e recebe o progresso em tempo real via SSE — o arquivo traduzido baixa automaticamente ao terminar.'
				}
			},
			{
				title: { en: 'Network Discovery', 'pt-br': 'Descoberta de Rede' },
				body: {
					en: 'mDNS finds the translator and the Android app on the local network automatically — no IP address or manual setup needed.',
					'pt-br':
						'mDNS localiza o translator e o app Android na rede local automaticamente — sem endereço IP ou configuração manual.'
				}
			},
			{
				title: { en: 'Signed Binaries', 'pt-br': 'Binários Assinados' },
				body: {
					en: 'Windows builds signed via SignPath Foundation for open-source GPL3 projects — installs without security warnings.',
					'pt-br':
						'Builds para Windows assinados via SignPath Foundation para projetos GPL3 open-source — instala sem avisos de segurança.'
				}
			}
		]
	},
	{
		id: 'brand-maker',
		title: 'Brand Maker',
		status: 'done',
		desc: {
			en: 'Builds a brand visual identity on screen with a live preview and downloads a design kit that keeps the AI agent (Claude Code) on the standard: skills, hooks and .mjs checkers, plus CSS and Tailwind tokens.',
			'pt-br':
				'Monta a identidade visual de uma marca na tela com prévia ao vivo e baixa um kit de design que prende o agente de IA (Claude Code) ao padrão: skills, hooks e verificadores .mjs, mais tokens em CSS e Tailwind.'
		},
		tech: [
			'SvelteKit',
			'Svelte 5',
			'TypeScript',
			'Tailwind v4',
			'Vitest',
			'Docker',
			'GitHub Pages'
		],
		github: 'https://github.com/vinicius-gpl/brand-maker',
		demo: 'https://brand-maker.vinicius-gpl.com',
		preview:
			'https://raw.githubusercontent.com/vinicius-gpl/brand-maker/main/docs/banner/banner.jpg',
		previewDimensions: { width: 1920, height: 1080 },
		images: [
			{
				title: { en: 'Editor and preview', 'pt-br': 'Editor e prévia' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/brand-maker/main/docs/images/editor.jpg'
			},
			{
				title: { en: 'Carbon pattern', 'pt-br': 'Padrão Carbon' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/brand-maker/main/docs/images/padrao-carbon.jpg'
			},
			{
				title: { en: 'Brand colors and tokens', 'pt-br': 'Cores da marca e tokens' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/brand-maker/main/docs/images/cores-e-padroes.jpg'
			}
		],
		highlights: [
			{
				title: { en: 'Palettes and Patterns', 'pt-br': 'Paletas e Padrões' },
				body: {
					en: '30 palettes in 7 groups, 10 interface patterns (Material 3, Fluent 2, Carbon, Primer, shadcn…) and 7 finishes, all applied live to a sample site.',
					'pt-br':
						'30 paletas em 7 grupos, 10 padrões de interface (Material 3, Fluent 2, Carbon, Primer, shadcn…) e 7 acabamentos, aplicados ao vivo num site de exemplo.'
				}
			},
			{
				title: { en: 'Design Rules', 'pt-br': 'Regras de Design' },
				body: {
					en: 'Never pure black or white, WCAG AA contrast computed live and the 7 UX laws with adjustable limits.',
					'pt-br':
						'Nunca preto nem branco puros, contraste WCAG AA calculado ao vivo e as 7 leis de UX com limites ajustáveis.'
				}
			},
			{
				title: { en: 'Agent Design Kit', 'pt-br': 'Kit de Design para o Agente' },
				body: {
					en: 'The zip brings Claude Code skills, hooks and dependency-free .mjs scripts that check every edited file against the brand.',
					'pt-br':
						'O zip traz skills, hooks e scripts .mjs sem dependência que conferem cada arquivo editado contra a marca no Claude Code.'
				}
			},
			{
				title: { en: '100% Static', 'pt-br': '100% Estático' },
				body: {
					en: 'The kit is generated in the browser — nothing leaves the machine. Published on GitHub Pages, with a Caddy Docker image as an option.',
					'pt-br':
						'O kit é gerado no navegador — nada sai da máquina. Publicado no GitHub Pages, com imagem Docker com Caddy como opção.'
				}
			}
		]
	},
	{
		id: 'acerola-ticket',
		title: 'Acerola Ticket',
		status: 'done',
		desc: {
			en: 'IT management platform with support tickets, computer inventory, maintenance and a systems Kanban integrated with GitHub. Includes a Windows agent for monitoring and automatic updates.',
			'pt-br':
				'Plataforma de gestão de TI com chamados, inventário de computadores, manutenção e Kanban de sistemas integrado ao GitHub. Inclui agente Windows para monitoramento e atualizações automáticas.'
		},
		tech: ['TypeScript', 'SvelteKit', 'NestJS', 'PostgreSQL', 'Drizzle', 'Go', 'Docker'],
		github: 'https://github.com/vinicius-gpl/acerola-ticket',
		preview:
			'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/brag/brag.jpg',
		previewDimensions: { width: 1920, height: 1080 },
		images: [
			{
				title: { en: 'Infrastructure Dashboard', 'pt-br': 'Painel de Infraestrutura' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/prints/infra-painel.jpg'
			},
			{
				title: { en: 'Infrastructure Tickets', 'pt-br': 'Chamados de Infraestrutura' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/prints/infra-chamados.jpg'
			},
			{
				title: { en: 'Windows Agent', 'pt-br': 'Agente Windows' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/prints/infra-agente-windows.jpg'
			},
			{
				title: { en: 'Systems and Projects', 'pt-br': 'Sistemas e Projetos' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/prints/sistema-projetos.jpg'
			},
			{
				title: { en: 'Systems Tickets', 'pt-br': 'Chamados de Sistemas' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/prints/sistema-chamados.jpg'
			},
			{
				title: { en: 'Systems Kanban', 'pt-br': 'Kanban de Sistemas' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/prints/sistema-kanban.jpg'
			},
			{
				title: { en: 'Systems Timeline', 'pt-br': 'Cronograma de Sistemas' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/prints/sistema-cronograma.jpg'
			},
			{
				title: { en: 'Maintenance Inventory', 'pt-br': 'Inventário de Manutenção' },
				url: 'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/prints/manutencao-inventario.jpg'
			}
		],
		highlights: [
			{
				title: { en: 'Support Tickets', 'pt-br': 'Gestão de Chamados' },
				body: {
					en: 'Employees open and track tickets with screenshots and attachments, with access controlled by module.',
					'pt-br':
						'Colaboradores abrem e acompanham chamados com prints e anexos, com acesso controlado por módulo.'
				}
			},
			{
				title: { en: 'Inventory and Maintenance', 'pt-br': 'Inventário e Manutenção' },
				body: {
					en: 'Tracks computers, parts, preventive maintenance and asset disposal, with a history for each machine.',
					'pt-br':
						'Acompanha computadores, peças, manutenções preventivas e descarte, com histórico de cada máquina.'
				}
			},
			{
				title: { en: 'GitHub Integration', 'pt-br': 'Integração com GitHub' },
				body: {
					en: 'Organizes software tickets in a Kanban and brings merged pull requests, closed issues and schedules into one timeline.',
					'pt-br':
						'Organiza chamados de software em Kanban e reúne PRs mergeados, issues fechadas e agendamentos em um cronograma.'
				}
			},
			{
				title: { en: 'Windows Agent', 'pt-br': 'Agente Windows' },
				body: {
					en: 'A Go agent sends machine measurements to the API and updates automatically to the published LTS version.',
					'pt-br':
						'Agente em Go envia medições das máquinas para a API e se atualiza automaticamente para a versão LTS publicada.'
				}
			}
		]
	},
	{
		id: 'acerola-translater',
		title: 'Acerola Translator',
		status: 'idea',
		desc: {
			en: 'Automatic manga and webtoon translation service. Detects speech balloons, runs OCR, translates via AI (Claude / Ollama / OpenAI), applies inpainting and re-renders the page in Brazilian Portuguese.',
			'pt-br':
				'Serviço de tradução automática de mangás e webtoons. Detecta balões, executa OCR, traduz via IA (Claude / Ollama / OpenAI), aplica inpainting e redesenha a página em português brasileiro.'
		},
		tech: ['Go', 'Python', 'FastAPI', 'OpenCV', 'manga-ocr', 'Svelte 5', 'Docker'],
		highlights: [
			{
				title: { en: 'Full Pipeline', 'pt-br': 'Pipeline Completo' },
				body: {
					en: 'Balloon detection → OCR → AI translation → inpainting → re-render, end to end in one job per page.',
					'pt-br':
						'Detecção de balões → OCR → tradução com IA → inpainting → redesenho, fim a fim em um único job por página.'
				}
			},
			{
				title: { en: 'Parallel Processing', 'pt-br': 'Processamento Paralelo' },
				body: {
					en: 'Multiple pages processed simultaneously; live progress streamed to the browser via Server-Sent Events.',
					'pt-br':
						'Múltiplas páginas processadas simultaneamente; progresso transmitido em tempo real ao navegador via Server-Sent Events.'
				}
			},
			{
				title: { en: 'Multi-provider AI', 'pt-br': 'IA Multi-provedor' },
				body: {
					en: 'Claude, OpenAI and Ollama (local model) behind a single interface — swap provider without touching the pipeline code.',
					'pt-br':
						'Claude, OpenAI e Ollama (modelo local) atrás de uma interface única — troca de provedor sem mexer no código do pipeline.'
				}
			},
			{
				title: { en: 'Hybrid Architecture', 'pt-br': 'Arquitetura Híbrida' },
				body: {
					en: 'Go manages HTTP, jobs and SSE. Python runs manga-ocr loaded once in memory — no cold start cost per page.',
					'pt-br':
						'Go gerencia HTTP, jobs e SSE. Python roda manga-ocr carregado uma vez na memória — sem custo de inicialização por página.'
				}
			},
			{
				title: { en: 'One-command Deploy', 'pt-br': 'Deploy com um Comando' },
				body: {
					en: 'Docker Compose bundles Go and Python into a single self-hosted stack — up and running with `docker compose up`.',
					'pt-br':
						'Docker Compose empacota Go e Python em uma stack self-hosted — no ar com `docker compose up`.'
				}
			}
		]
	},
	{
		id: 'acerola-relay',
		title: 'Acerola Relay',
		status: 'idea',
		desc: {
			en: 'Sync and relay server for the Acerola ecosystem. Bridges the desktop client, mobile reader and translator so libraries, reading progress and translated files stay in sync across devices.',
			'pt-br':
				'Servidor de sync e relay do ecossistema Acerola. Conecta o cliente desktop, o leitor mobile e o translator para que bibliotecas, progresso de leitura e arquivos traduzidos fiquem sincronizados entre dispositivos.'
		},
		tech: ['Rust', 'iroh', 'SQLite', 'Docker'],
		highlights: [
			{
				title: { en: 'Peer-to-peer with iroh', 'pt-br': 'Peer-to-peer com iroh' },
				body: {
					en: 'Built on iroh for direct device-to-device connections — no central server required, works through NAT and firewalls automatically.',
					'pt-br':
						'Construído sobre iroh para conexões diretas entre dispositivos — sem servidor central, atravessa NAT e firewalls automaticamente.'
				}
			},
			{
				title: { en: 'Remote Access', 'pt-br': 'Acesso Remoto' },
				body: {
					en: 'Exposes your local library securely without port forwarding, VPN or any router configuration.',
					'pt-br':
						'Expõe sua biblioteca local com segurança sem redirecionamento de porta, VPN ou qualquer configuração de roteador.'
				}
			},
			{
				title: { en: 'Cross-device Sync', 'pt-br': 'Sync Entre Dispositivos' },
				body: {
					en: 'Reading progress, bookmarks and translated files stay consistent between Android and desktop automatically.',
					'pt-br':
						'Progresso de leitura, favoritos e arquivos traduzidos ficam sincronizados entre Android e desktop automaticamente.'
				}
			},
			{
				title: { en: 'Self-hosted', 'pt-br': 'Self-hosted' },
				body: {
					en: 'Lightweight Docker container — runs on any home server, Raspberry Pi or VPS with minimal resources.',
					'pt-br':
						'Container Docker leve — roda em qualquer servidor doméstico, Raspberry Pi ou VPS com recursos mínimos.'
				}
			},
			{
				title: { en: 'Ecosystem Bridge', 'pt-br': 'Ponte do Ecossistema' },
				body: {
					en: 'The missing link that connects acerola-android, acerola-desktop and acerola-translator outside your local network.',
					'pt-br':
						'O elo que conecta acerola-android, acerola-desktop e acerola-translator fora da rede local.'
				}
			}
		]
	}
];
