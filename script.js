// Le système est maintenant en mode JSON obligatoire.
// Pour désactiver ce mode, supprimer cette variable et activer le fallback.
const VERSIONS = null;

const COMMENTS_PER_PAGE = 10;
let currentCommentPage = 0;

// Language translation system - Data directly embedded
let allLanguages = {
  "fr": {
    "nav_features": "Fonctionnalités",
    "nav_themes": "Thèmes",
    "nav_games": "Jeux",
    "nav_download": "Télécharger",
    "nav_language": "Langue",
    "hero_title": "3M - TXT Generator",
    "hero_subtitle": "Créateur de fichiers texte avec thèmes personnalisés et jeux intégrés",
    "hero_btn": "Télécharger Maintenant",
    "features_title": "Fonctionnalités Principales",
    "features_subtitle": "Tout ce dont vous avez besoin pour générer des fichiers texte de manière professionnelle",
    "feature1_title": "Générateur de Fichiers TXT",
    "feature1_desc": "Créez des fichiers texte de n'importe quelle taille avec un contrôle total. Interface intuitive et performante pour tous vos besoins de génération de texte.",
    "feature1_item1": "Génération rapide",
    "feature1_item2": "Taille personnalisable",
    "feature1_item3": "Format optimisé",
    "feature2_title": "Éditeur de Thèmes",
    "feature2_desc": "Personnalisez votre environnement de travail avec notre éditeur de thèmes avancé. Créez des interfaces uniques adaptées à votre style.",
    "feature2_item1": "Thèmes multiples",
    "feature2_item2": "Couleurs personnalisables",
    "feature2_item3": "Aperçu en temps réel",
    "feature3_title": "Calculatrice Intégrée",
    "feature3_desc": "Une calculatrice moderne et fluide intégrée directement dans l'application pour vos calculs rapides sans quitter l'interface.",
    "feature3_item1": "Interface moderne",
    "feature3_item2": "Calculs instantanés",
    "feature3_item3": "Design élégant",
    "themes_title": "Thèmes Spectaculaires",
    "themes_subtitle": "Plongez dans des environnements visuels immersifs",
    "theme_ocean": "🌊 Thème Ocean",
    "theme_ocean_desc": "Naviguez dans un univers aquatique avec des bulles flottantes et une ambiance marine relaxante. Parfait pour les longues sessions de travail.",
    "theme_galactic": "🌌 Thème Galactic",
    "theme_galactic_desc": "Explorez les étoiles avec notre thème galactique animé. Voyagez à travers l'univers infini avec des couleurs cosmiques éclatantes.",
    "theme_matrix": "💚 Thème Matrix",
    "theme_matrix_desc": "Plongez dans le code avec le thème Matrix. Une ambiance hacker classique avec des caractères verts lumineux sur fond noir.",
    "games_title": "Jeux Intégrés",
    "games_subtitle": "Prenez une pause avec nos jeux amusants",
    "game_dino": "🦖 Chrome Dino - Jeu Caché",
    "game_dino_desc": "Un Easter egg extraordinaire vous attend ! Découvrez ce jeu à dinosaure caché et vivez une expérience de jeu rétro addictive directement dans l'application.",
    "game_easter_egg": "Easter Egg",
    "game_unlock": "À Débloquer",
    "download_title": "Prêt à Commencer ?",
    "download_subtitle": "Téléchargez 3M - TXT Generator maintenant et transformez votre flux de travail",
    "download_opensource": "Télécharger Open Source",
    "download_info": "Version 1.0 - Entièrement gratuit et open-source",
    "stats_languages": "Langues Supportées",
    "stats_themes": "Thèmes Animés",
    "stats_files": "Fichiers à Générer",
    "stats_game": "Jeu Secret",
    "footer_about": "À Propos",
    "footer_about_text": "3M est une application de bureau moderne combinant la génération de fichiers texte avec des thèmes magnifiques et des jeux cachés.",
    "footer_links": "Liens Rapides",
    "footer_social": "Réseaux Sociaux",
    "footer_bottom": "Libre d'utilisation et open source.",
    "notification_download": "Téléchargement en préparation...",
    "modal_select_language": "Sélectionner une langue",
    "download_modal_title": "📥 Télécharger une Version",
    "download_loading": "Chargement des versions...",
    "download_no_versions": "Aucune version disponible",
    "download_error": "Erreur lors du chargement des versions",
    "download_button": "Télécharger"
  },
  "en": {
    "nav_features": "Features",
    "nav_themes": "Themes",
    "nav_games": "Games",
    "nav_download": "Download",
    "nav_language": "Language",
    "hero_title": "3M - TXT Generator",
    "hero_subtitle": "Text file creator with custom themes and integrated games",
    "hero_btn": "Download Now",
    "features_title": "Main Features",
    "features_subtitle": "Everything you need to generate text files professionally",
    "feature1_title": "TXT File Generator",
    "feature1_desc": "Create text files of any size with full control. Intuitive and powerful interface for all your text generation needs.",
    "feature1_item1": "Fast generation",
    "feature1_item2": "Customizable size",
    "feature1_item3": "Optimized format",
    "feature2_title": "Theme Editor",
    "feature2_desc": "Customize your work environment with our advanced theme editor. Create unique interfaces tailored to your style.",
    "feature2_item1": "Multiple themes",
    "feature2_item2": "Customizable colors",
    "feature2_item3": "Real-time preview",
    "feature3_title": "Integrated Calculator",
    "feature3_desc": "A modern and smooth calculator integrated directly into the application for quick calculations without leaving the interface.",
    "feature3_item1": "Modern interface",
    "feature3_item2": "Instant calculations",
    "feature3_item3": "Elegant design",
    "themes_title": "Spectacular Themes",
    "themes_subtitle": "Dive into immersive visual environments",
    "theme_ocean": "🌊 Ocean Theme",
    "theme_ocean_desc": "Navigate through an aquatic universe with floating bubbles and a relaxing marine atmosphere. Perfect for long work sessions.",
    "theme_galactic": "🌌 Galactic Theme",
    "theme_galactic_desc": "Explore the stars with our animated galactic theme. Travel through the infinite universe with dazzling cosmic colors.",
    "theme_matrix": "💚 Matrix Theme",
    "theme_matrix_desc": "Dive into code with the Matrix theme. A classic hacker atmosphere with glowing green characters on a black background.",
    "games_title": "Integrated Games",
    "games_subtitle": "Take a break with our fun games",
    "game_dino": "🦖 Chrome Dino - Hidden Game",
    "game_dino_desc": "An extraordinary Easter egg awaits you! Discover this hidden dinosaur game and experience an addictive retro gaming experience right in the application.",
    "game_easter_egg": "Easter Egg",
    "game_unlock": "Unlock",
    "download_title": "Ready to Start?",
    "download_subtitle": "Download 3M - TXT Generator now and transform your workflow",
    "download_opensource": "Download Open Source",
    "download_info": "Version 1.0 - Completely free and open-source",
    "stats_languages": "Languages Supported",
    "stats_themes": "Animated Themes",
    "stats_files": "Files to Generate",
    "stats_game": "Secret Game",
    "footer_about": "About",
    "footer_about_text": "3M is a modern desktop application combining text file generation with beautiful themes and hidden games.",
    "footer_links": "Quick Links",
    "footer_social": "Social Networks",
    "footer_bottom": "Free to use and open source.",
    "notification_download": "Download in preparation...",
    "modal_select_language": "Select a language",
    "download_modal_title": "📥 Download a Version",
    "download_loading": "Loading versions...",
    "download_no_versions": "No versions available",
    "download_error": "Error loading versions",
    "download_button": "Download"
  },
  "es": {
    "nav_features": "Características",
    "nav_themes": "Temas",
    "nav_games": "Juegos",
    "nav_download": "Descargar",
    "nav_language": "Idioma",
    "hero_title": "3M - Generador TXT",
    "hero_subtitle": "Creador de archivos de texto con temas personalizados y juegos integrados",
    "hero_btn": "Descargar Ahora",
    "features_title": "Características Principales",
    "features_subtitle": "Todo lo que necesitas para generar archivos de texto profesionalmente",
    "feature1_title": "Generador de Archivos TXT",
    "feature1_desc": "Cree archivos de texto de cualquier tamaño con control total. Interfaz intuitiva y poderosa para todas sus necesidades de generación de texto.",
    "feature1_item1": "Generación rápida",
    "feature1_item2": "Tamaño personalizable",
    "feature1_item3": "Formato optimizado",
    "feature2_title": "Editor de Temas",
    "feature2_desc": "Personalice su entorno de trabajo con nuestro editor de temas avanzado. Cree interfaces únicas adaptadas a su estilo.",
    "feature2_item1": "Múltiples temas",
    "feature2_item2": "Colores personalizables",
    "feature2_item3": "Vista previa en tiempo real",
    "feature3_title": "Calculadora Integrada",
    "feature3_desc": "Una calculadora moderna y fluida integrada directamente en la aplicación para cálculos rápidos sin salir de la interfaz.",
    "feature3_item1": "Interfaz moderna",
    "feature3_item2": "Cálculos instantáneos",
    "feature3_item3": "Diseño elegante",
    "themes_title": "Temas Espectaculares",
    "themes_subtitle": "Sumérgete en entornos visuales inmersivos",
    "theme_ocean": "🌊 Tema Océano",
    "theme_ocean_desc": "Navega por un universo acuático con burbujas flotantes y una atmósfera marina relajante. Perfecto para largas sesiones de trabajo.",
    "theme_galactic": "🌌 Tema Galáctico",
    "theme_galactic_desc": "Explora las estrellas con nuestro tema galáctico animado. Viaja a través del universo infinito con colores cósmicos deslumbrantes.",
    "theme_matrix": "💚 Tema Matrix",
    "theme_matrix_desc": "Sumérgete en código con el tema Matrix. Una atmósfera hacker clásica con caracteres verdes luminosos sobre fondo negro.",
    "games_title": "Juegos Integrados",
    "games_subtitle": "Toma un descanso con nuestros juegos divertidos",
    "game_dino": "🦖 Chrome Dino - Juego Oculto",
    "game_dino_desc": "¡Un Easter egg extraordinario te espera! Descubre este juego de dinosaurio oculto y vive una experiencia de juego retro adictiva directamente en la aplicación.",
    "game_easter_egg": "Easter Egg",
    "game_unlock": "Desbloquear",
    "download_title": "¿Listo para Comenzar?",
    "download_subtitle": "Descarga 3M - Generador TXT ahora y transforma tu flujo de trabajo",
    "download_opensource": "Descargar Open Source",
    "download_info": "Versión 1.0 - Completamente gratuito y de código abierto",
    "stats_languages": "Idiomas Soportados",
    "stats_themes": "Temas Animados",
    "stats_files": "Archivos para Generar",
    "stats_game": "Juego Secreto",
    "footer_about": "Acerca de",
    "footer_about_text": "3M es una aplicación de escritorio moderna que combina la generación de archivos de texto con temas hermosos y juegos ocultos.",
    "footer_links": "Enlaces Rápidos",
    "footer_social": "Redes Sociales",
    "footer_bottom": "Libre de usar y de código abierto.",
    "notification_download": "Descarga en preparación...",
    "modal_select_language": "Seleccionar idioma",
    "download_modal_title": "📥 Descargar una Versión",
    "download_loading": "Cargando versiones...",
    "download_no_versions": "No hay versiones disponibles",
    "download_error": "Error al cargar las versiones",
    "download_button": "Descargar"
  },
  "de": {
    "nav_features": "Funktionen",
    "nav_themes": "Designs",
    "nav_games": "Spiele",
    "nav_download": "Herunterladen",
    "nav_language": "Sprache",
    "hero_title": "3M - TXT Generator",
    "hero_subtitle": "Textdatei-Ersteller mit benutzerdefinierten Designs und integrierten Spielen",
    "hero_btn": "Jetzt Herunterladen",
    "features_title": "Hauptmerkmale",
    "features_subtitle": "Alles, was Sie zum professionellen Erstellen von Textdateien benötigen",
    "feature1_title": "TXT-Datei-Generator",
    "feature1_desc": "Erstellen Sie Textdateien beliebiger Größe mit vollständiger Kontrolle. Intuitive und leistungsstarke Oberfläche für alle Ihre Anforderungen zur Texterstellung.",
    "feature1_item1": "Schnelle Generierung",
    "feature1_item2": "Anpassbare Größe",
    "feature1_item3": "Optimiertes Format",
    "feature2_title": "Design-Editor",
    "feature2_desc": "Passen Sie Ihre Arbeitsumgebung mit unserem erweiterten Design-Editor an. Erstellen Sie einzigartige Oberflächen, die Ihrem Stil entsprechen.",
    "feature2_item1": "Mehrere Designs",
    "feature2_item2": "Anpassbare Farben",
    "feature2_item3": "Echtzeit-Vorschau",
    "feature3_title": "Integrierter Rechner",
    "feature3_desc": "Ein moderner und flüssiger Rechner, der direkt in die Anwendung integriert ist, für schnelle Berechnungen ohne die Oberfläche zu verlassen.",
    "feature3_item1": "Moderne Oberfläche",
    "feature3_item2": "Sofortige Berechnungen",
    "feature3_item3": "Elegantes Design",
    "themes_title": "Spektakuläre Designs",
    "themes_subtitle": "Tauchen Sie in immersive visuelle Umgebungen ein",
    "theme_ocean": "🌊 Ozean-Design",
    "theme_ocean_desc": "Navigieren Sie durch ein Wasseruniversum mit schwebenden Blasen und einer entspannten Meeresatmosphäre. Perfekt für lange Arbeitssitzungen.",
    "theme_galactic": "🌌 Galaktisches Design",
    "theme_galactic_desc": "Erkunden Sie die Sterne mit unserem animierten galaktischen Design. Reisen Sie durch das unendliche Universum mit spektakulären kosmischen Farben.",
    "theme_matrix": "💚 Matrix-Design",
    "theme_matrix_desc": "Tauchen Sie mit dem Matrix-Design in Code ein. Eine klassische Hacker-Atmosphäre mit leuchtend grünen Zeichen auf schwarzem Hintergrund.",
    "games_title": "Integrierte Spiele",
    "games_subtitle": "Machen Sie eine Pause mit unseren unterhaltsamen Spielen",
    "game_dino": "🦖 Chrome Dino - Verstecktes Spiel",
    "game_dino_desc": "Ein außergewöhnliches Easter Egg erwartet Sie! Entdecken Sie dieses versteckte Dinosaurier-Spiel und erleben Sie ein süchtig machendes Retro-Spielerlebnis direkt in der Anwendung.",
    "game_easter_egg": "Easter Egg",
    "game_unlock": "Freischalten",
    "download_title": "Bereit zum Starten?",
    "download_subtitle": "Laden Sie 3M - TXT Generator herunter und transformieren Sie Ihren Arbeitsablauf",
    "download_opensource": "Open Source herunterladen",
    "download_info": "Version 1.0 - Völlig kostenlos und Open Source",
    "stats_languages": "Unterstützte Sprachen",
    "stats_themes": "Animierte Designs",
    "stats_files": "Dateien zum Erstellen",
    "stats_game": "Geheimes Spiel",
    "footer_about": "Über",
    "footer_about_text": "3M ist eine moderne Desktop-Anwendung, die Texterzeugung mit schönen Designs und versteckten Spielen kombiniert.",
    "footer_links": "Schnelllinks",
    "footer_social": "Soziale Netzwerke",
    "footer_bottom": "Kostenlos zu verwenden und Open Source.",
    "notification_download": "Download wird vorbereitet...",
    "modal_select_language": "Sprache auswählen",
    "download_modal_title": "📥 Version Herunterladen",
    "download_loading": "Versionen werden geladen...",
    "download_no_versions": "Keine Versionen verfügbar",
    "download_error": "Fehler beim Laden der Versionen",
    "download_button": "Herunterladen"
  },
  "it": {
    "nav_features": "Caratteristiche",
    "nav_themes": "Temi",
    "nav_games": "Giochi",
    "nav_download": "Scarica",
    "nav_language": "Lingua",
    "hero_title": "3M - Generatore TXT",
    "hero_subtitle": "Creatore di file di testo con temi personalizzati e giochi integrati",
    "hero_btn": "Scarica Ora",
    "features_title": "Caratteristiche Principali",
    "features_subtitle": "Tutto ciò di cui hai bisogno per generare file di testo professionalmente",
    "feature1_title": "Generatore di File TXT",
    "feature1_desc": "Crea file di testo di qualsiasi dimensione con controllo totale. Interfaccia intuitiva e potente per tutte le tue esigenze di generazione di testo.",
    "feature1_item1": "Generazione veloce",
    "feature1_item2": "Dimensione personalizzabile",
    "feature1_item3": "Formato ottimizzato",
    "feature2_title": "Editor di Temi",
    "feature2_desc": "Personalizza il tuo ambiente di lavoro con il nostro editor di temi avanzato. Crea interfacce uniche adatte al tuo stile.",
    "feature2_item1": "Temi multipli",
    "feature2_item2": "Colori personalizzabili",
    "feature2_item3": "Anteprima in tempo reale",
    "feature3_title": "Calcolatrice Integrata",
    "feature3_desc": "Una calcolatrice moderna e fluida integrata direttamente nell'applicazione per calcoli rapidi senza lasciare l'interfaccia.",
    "feature3_item1": "Interfaccia moderna",
    "feature3_item2": "Calcoli istantanei",
    "feature3_item3": "Design elegante",
    "themes_title": "Temi Spettacolari",
    "themes_subtitle": "Immergiti in ambienti visivi immersivi",
    "theme_ocean": "🌊 Tema Oceano",
    "theme_ocean_desc": "Naviga attraverso un universo acquatico con bolle fluttuanti e un'atmosfera marina rilassante. Perfetto per lunghe sessioni di lavoro.",
    "theme_galactic": "🌌 Tema Galattico",
    "theme_galactic_desc": "Esplora le stelle con il nostro tema galattico animato. Viaggia attraverso l'universo infinito con colori cosmici abbaglianti.",
    "theme_matrix": "💚 Tema Matrix",
    "theme_matrix_desc": "Immergiti nel codice con il tema Matrix. Un'atmosfera hacker classica con caratteri verdi luminosi su sfondo nero.",
    "games_title": "Giochi Integrati",
    "games_subtitle": "Fai una pausa con i nostri giochi divertenti",
    "game_dino": "🦖 Chrome Dino - Gioco Nascosto",
    "game_dino_desc": "Un Easter egg straordinario ti aspetta! Scopri questo gioco di dinosauro nascosto e vivi un'esperienza di gioco retrò coinvolgente direttamente nell'applicazione.",
    "game_easter_egg": "Easter Egg",
    "game_unlock": "Sblocca",
    "download_title": "Pronto a Iniziare?",
    "download_subtitle": "Scarica 3M - Generatore TXT ora e trasforma il tuo flusso di lavoro",
    "download_opensource": "Scarica Open Source",
    "download_info": "Versione 1.0 - Completamente gratuito e open source",
    "stats_languages": "Lingue Supportate",
    "stats_themes": "Temi Animati",
    "stats_files": "File da Generare",
    "stats_game": "Gioco Segreto",
    "footer_about": "Informazioni",
    "footer_about_text": "3M è un'applicazione desktop moderna che combina la generazione di file di testo con temi bellissimi e giochi nascosti.",
    "footer_links": "Link Rapidi",
    "footer_social": "Social Network",
    "footer_bottom": "Libero da usare e open source.",
    "notification_download": "Download in preparazione...",
    "modal_select_language": "Seleziona lingua",
    "download_modal_title": "📥 Scarica una Versione",
    "download_loading": "Caricamento versioni...",
    "download_no_versions": "Nessuna versione disponibile",
    "download_error": "Errore durante il caricamento delle versioni",
    "download_button": "Scarica"
  },
  "pt": {
    "nav_features": "Recursos",
    "nav_themes": "Temas",
    "nav_games": "Jogos",
    "nav_download": "Baixar",
    "nav_language": "Idioma",
    "hero_title": "3M - Gerador TXT",
    "hero_subtitle": "Criador de arquivo de texto com temas personalizados e jogos integrados",
    "hero_btn": "Baixar Agora",
    "features_title": "Recursos Principais",
    "features_subtitle": "Tudo que você precisa para gerar arquivos de texto profissionalmente",
    "feature1_title": "Gerador de Arquivo TXT",
    "feature1_desc": "Crie arquivos de texto de qualquer tamanho com controle total. Interface intuitiva e poderosa para todas as suas necessidades de geração de texto.",
    "feature1_item1": "Geração rápida",
    "feature1_item2": "Tamanho personalizável",
    "feature1_item3": "Formato otimizado",
    "feature2_title": "Editor de Temas",
    "feature2_desc": "Personalize seu ambiente de trabalho com nosso editor de temas avançado. Crie interfaces únicas adaptadas ao seu estilo.",
    "feature2_item1": "Múltiplos temas",
    "feature2_item2": "Cores personalizáveis",
    "feature2_item3": "Visualização em tempo real",
    "feature3_title": "Calculadora Integrada",
    "feature3_desc": "Uma calculadora moderna e fluida integrada diretamente no aplicativo para cálculos rápidos sem sair da interface.",
    "feature3_item1": "Interface moderna",
    "feature3_item2": "Cálculos instantâneos",
    "feature3_item3": "Design elegante",
    "themes_title": "Temas Espetaculares",
    "themes_subtitle": "Mergulhe em ambientes visuais imersivos",
    "theme_ocean": "🌊 Tema Oceano",
    "theme_ocean_desc": "Navegue por um universo aquático com bolhas flutuantes e uma atmosfera marinha relaxante. Perfeito para longas sessões de trabalho.",
    "theme_galactic": "🌌 Tema Galáxia",
    "theme_galactic_desc": "Explore as estrelas com nosso tema galáxia animado. Viaje pelo universo infinito com cores cósmicas deslumbrantes.",
    "theme_matrix": "💚 Tema Matrix",
    "theme_matrix_desc": "Mergulhe no código com o tema Matrix. Uma atmosfera hacker clássica com caracteres verdes brilhantes em fundo preto.",
    "games_title": "Jogos Integrados",
    "games_subtitle": "Faça uma pausa com nossos jogos divertidos",
    "game_dino": "🦖 Chrome Dino - Jogo Oculto",
    "game_dino_desc": "Um Easter egg extraordinário o espera! Descubra este jogo de dinossauro oculto e viva uma experiência retrô viciante direto no aplicativo.",
    "game_easter_egg": "Easter Egg",
    "game_unlock": "Desbloquear",
    "download_title": "Pronto para Começar?",
    "download_subtitle": "Baixe 3M - Gerador TXT agora e transforme seu fluxo de trabalho",
    "download_opensource": "Baixar Open Source",
    "download_info": "Versão 1.0 - Completamente gratuito e de código aberto",
    "stats_languages": "Idiomas Suportados",
    "stats_themes": "Temas Animados",
    "stats_files": "Arquivos para Gerar",
    "stats_game": "Jogo Secreto",
    "footer_about": "Sobre",
    "footer_about_text": "3M é um aplicativo desktop moderno que combina a geração de arquivos de texto com temas bonitos e jogos ocultos.",
    "footer_links": "Links Rápidos",
    "footer_social": "Redes Sociais",
    "footer_bottom": "Livre para usar e código aberto.",
    "notification_download": "Download em preparação...",
    "modal_select_language": "Selecionar idioma",
    "download_modal_title": "📥 Baixar uma Versão",
    "download_loading": "Carregando versões...",
    "download_no_versions": "Nenhuma versão disponível",
    "download_error": "Erro ao carregar as versões",
    "download_button": "Baixar"
  },
  "ru": {
    "nav_features": "Функции",
    "nav_themes": "Темы",
    "nav_games": "Игры",
    "nav_download": "Загрузить",
    "nav_language": "Язык",
    "hero_title": "3M - Генератор TXT",
    "hero_subtitle": "Создатель текстовых файлов с пользовательскими темами и интегрированными играми",
    "hero_btn": "Загрузить Сейчас",
    "features_title": "Основные Возможности",
    "features_subtitle": "Все необходимое для профессионального создания текстовых файлов",
    "feature1_title": "Генератор TXT-файлов",
    "feature1_desc": "Создавайте текстовые файлы любого размера с полным контролем. Интуитивный и мощный интерфейс для всех ваших потребностей в создании текста.",
    "feature1_item1": "Быстрое создание",
    "feature1_item2": "Настраиваемый размер",
    "feature1_item3": "Оптимизированный формат",
    "feature2_title": "Редактор Тем",
    "feature2_desc": "Настройте свою рабочую среду с помощью нашего расширенного редактора тем. Создавайте уникальные интерфейсы в соответствии с вашим стилем.",
    "feature2_item1": "Множество тем",
    "feature2_item2": "Настраиваемые цвета",
    "feature2_item3": "Предпросмотр в реальном времени",
    "feature3_title": "Встроенный Калькулятор",
    "feature3_desc": "Современный и плавный калькулятор, интегрированный прямо в приложение для быстрых расчетов без необходимости покидать интерфейс.",
    "feature3_item1": "Современный интерфейс",
    "feature3_item2": "Мгновенные вычисления",
    "feature3_item3": "Элегантный дизайн",
    "themes_title": "Впечатляющие Темы",
    "themes_subtitle": "Погрузитесь в захватывающие визуальные среды",
    "theme_ocean": "🌊 Тема Океан",
    "theme_ocean_desc": "Плывите по водному универсуму с плавающими пузырьками и расслабляющей морской атмосферой. Идеально для длительных рабочих сессий.",
    "theme_galactic": "🌌 Тема Галактика",
    "theme_galactic_desc": "Исследуйте звезды с нашей анимированной галактической темой. Путешествуйте через бесконечную вселенную с ослепительными космическими цветами.",
    "theme_matrix": "💚 Тема Matrix",
    "theme_matrix_desc": "Погрузитесь в код с темой Matrix. Классическая атмосфера хакера со светящимися зелеными символами на черном фоне.",
    "games_title": "Интегрированные Игры",
    "games_subtitle": "Сделайте перерыв с нашими забавными играми",
    "game_dino": "🦖 Chrome Dino - Скрытая Игра",
    "game_dino_desc": "Необыкновенный пасхальный подарок уже ждет вас! Обнаружьте эту скрытую игру с динозавром и испытайте захватывающий ретро-игровой опыт прямо в приложении.",
    "game_easter_egg": "Пасхальное яйцо",
    "game_unlock": "Разблокировать",
    "download_title": "Готовы Начать?",
    "download_subtitle": "Загрузите 3M - Генератор TXT прямо сейчас и трансформируйте свой рабочий процесс",
    "download_opensource": "Загрузить Open Source",
    "download_info": "Версия 1.0 - Полностью бесплатно и с открытым исходным кодом",
    "stats_languages": "Поддерживаемые Языки",
    "stats_themes": "Анимированные Темы",
    "stats_files": "Файлы для Создания",
    "stats_game": "Секретная Игра",
    "footer_about": "О Программе",
    "footer_about_text": "3M - это современное настольное приложение, объединяющее генерацию текстовых файлов с красивыми темами и скрытыми играми.",
    "footer_links": "Быстрые Ссылки",
    "footer_social": "Социальные Сети",
    "footer_bottom": "Свободно использовать и с открытым исходным кодом.",
    "notification_download": "Загрузка в процессе подготовки...",
    "modal_select_language": "Выбрать язык",
    "download_modal_title": "📥 Скачать Версию",
    "download_loading": "Загрузка версий...",
    "download_no_versions": "Нет доступных версий",
    "download_error": "Ошибка при загрузке версий",
    "download_button": "Скачать"
  },
  "zh": {
    "nav_features": "功能",
    "nav_themes": "主题",
    "nav_games": "游戏",
    "nav_download": "下载",
    "nav_language": "语言",
    "hero_title": "3M - TXT 生成器",
    "hero_subtitle": "具有自定义主题和集成游戏的文本文件创建者",
    "hero_btn": "立即下载",
    "features_title": "主要功能",
    "features_subtitle": "专业生成文本文件所需的一切",
    "feature1_title": "TXT 文件生成器",
    "feature1_desc": "创建任何大小的文本文件，具有完全控制权。直观而强大的界面满足所有文本生成需求。",
    "feature1_item1": "快速生成",
    "feature1_item2": "可自定义的大小",
    "feature1_item3": "优化格式",
    "feature2_title": "主题编辑器",
    "feature2_desc": "使用我们的高级主题编辑器自定义您的工作环境。创建适合您风格的独特界面。",
    "feature2_item1": "多个主题",
    "feature2_item2": "可自定义的颜色",
    "feature2_item3": "实时预览",
    "feature3_title": "集成计算器",
    "feature3_desc": "一个现代流畅的计算器直接集成到应用程序中，可进行快速计算，无需离开界面。",
    "feature3_item1": "现代界面",
    "feature3_item2": "即时计算",
    "feature3_item3": "优雅设计",
    "themes_title": "壮观主题",
    "themes_subtitle": "沉浸在身临其境的视觉环境中",
    "theme_ocean": "🌊 海洋主题",
    "theme_ocean_desc": "在水生宇宙中航行，漂浮的气泡和放松的海洋氛围。非常适合长时间的工作会议。",
    "theme_galactic": "🌌 银河主题",
    "theme_galactic_desc": "使用我们的动画银河主题探索星星。穿越无限宇宙，享受耀眼的宇宙色彩。",
    "theme_matrix": "💚 矩阵主题",
    "theme_matrix_desc": "用矩阵主题潜入代码。经典黑客氛围，黑色背景上闪烁的绿色字符。",
    "games_title": "集成游戏",
    "games_subtitle": "休息一下，享受我们好玩的游戏",
    "game_dino": "🦖 Chrome 恐龙 - 隐藏游戏",
    "game_dino_desc": "一个非凡的复活节彩蛋正在等着你！发现这个隐藏的恐龙游戏，直接在应用程序中体验令人上瘾的复古游戏体验。",
    "game_easter_egg": "复活节彩蛋",
    "game_unlock": "解锁",
    "download_title": "准备好开始了吗？",
    "download_subtitle": "立即下载 3M - TXT 生成器并改变您的工作流程",
    "download_opensource": "下载开源版本",
    "download_info": "版本 1.0 - 完全免费和开源",
    "stats_languages": "支持的语言",
    "stats_themes": "动画主题",
    "stats_files": "要生成的文件",
    "stats_game": "隐藏游戏",
    "footer_about": "关于",
    "footer_about_text": "3M 是一个现代化的桌面应用程序，结合了文本文件生成和美丽的主题以及隐藏游戏。",
    "footer_links": "快速链接",
    "footer_social": "社交网络",
    "footer_bottom": "免费使用和开源。",
    "notification_download": "下载准备中...",
    "modal_select_language": "选择语言",
    "download_modal_title": "📥 下载版本",
    "download_loading": "加载版本中...",
    "download_no_versions": "没有可用版本",
    "download_error": "加载版本出错",
    "download_button": "下载"
  },
  "ja": {
    "nav_features": "機能",
    "nav_themes": "テーマ",
    "nav_games": "ゲーム",
    "nav_download": "ダウンロード",
    "nav_language": "言語",
    "hero_title": "3M - TXTジェネレーター",
    "hero_subtitle": "カスタムテーマと統合ゲーム付きテキストファイル作成ツール",
    "hero_btn": "今すぐダウンロード",
    "features_title": "主な機能",
    "features_subtitle": "テキストファイルをプロフェッショナルに生成するために必要なすべて",
    "feature1_title": "TXTファイルジェネレーター",
    "feature1_desc": "任意のサイズのテキストファイルを完全に制御して作成します。すべてのテキスト生成ニーズに対応する直感的で強力なインターフェース。",
    "feature1_item1": "高速生成",
    "feature1_item2": "カスタマイズ可能なサイズ",
    "feature1_item3": "最適化形式",
    "feature2_title": "テーマエディター",
    "feature2_desc": "高度なテーマエディターを使用して作業環境をカスタマイズます。あなたのスタイルに合わせた独自のインターフェースを作成します。",
    "feature2_item1": "複数のテーマ",
    "feature2_item2": "カスタマイズ可能な色",
    "feature2_item3": "リアルタイムプレビュー",
    "feature3_title": "統合計算機",
    "feature3_desc": "アプリケーションに直接統合された最新でスムーズな電卓。インターフェースを離れることなく迅速な計算が可能です。",
    "feature3_item1": "最新のインターフェース",
    "feature3_item2": "瞬時の計算",
    "feature3_item3": "エレガントなデザイン",
    "themes_title": "壮大なテーマ",
    "themes_subtitle": "没入型の視覚環境に飛び込む",
    "theme_ocean": "🌊 オーシャンテーマ",
    "theme_ocean_desc": "浮遊する泡とリラックスした海の雰囲気を持つ水域の宇宙をナビゲートします。長い仕事セッションに最適です。",
    "theme_galactic": "🌌 ギャラクティックテーマ",
    "theme_galactic_desc": "アニメーション銀河系テーマで星を探索します。無限の宇宙を旅して、「眩しい宇宙の色を楽しみます。",
    "theme_matrix": "💚 マトリックステーマ",
    "theme_matrix_desc": "Matrixテーマでコードに飛び込みます。黒い背景に輝く緑色の文字を持つ古典的なハッカー雰囲気。",
    "games_title": "統合ゲーム",
    "games_subtitle": "楽しいゲームで一休みしましょう",
    "game_dino": "🦖 ChromeDino - 隠されたゲーム",
    "game_dino_desc": "素晴らしいイースターエッグがあなたを待っています！この隠された恐竜ゲームを発見し、アプリケーション内で中毒性のあるレトロゲーム体験を楽しみます。",
    "game_easter_egg": "イースターエッグ",
    "game_unlock": "ロック解除",
    "download_title": "始める準備はできていますか？",
    "download_subtitle": "今すぐ3M-TXTジェネレーターをダウンロードしてワークフローを変換します",
    "download_opensource": "オープンソースをダウンロード",
    "download_info": "バージョン1.0-完全に無料でオープンソース",
    "stats_languages": "サポートされている言語",
    "stats_themes": "アニメーション化されたテーマ",
    "stats_files": "生成するファイル",
    "stats_game": "シークレットゲーム",
    "footer_about": "について",
    "footer_about_text": "3Mは、テキストファイル生成と美しいテーマおよび隠しゲームを組み合わせた最新のデスクトップアプリケーションです。",
    "footer_links": "クイックリンク",
    "footer_social": "ソーシャルネットワーク",
    "footer_bottom": "自由に使用でき、オープンソース。",
    "notification_download": "ダウンロード準備中...",
    "modal_select_language": "言語を選択",
    "download_modal_title": "📥 バージョンをダウンロード",
    "download_loading": "バージョンを読み込み中...",
    "download_no_versions": "利用可能なバージョンがありません",
    "download_error": "バージョンの読み込みエラー",
    "download_button": "ダウンロード"
  },
  "ar": {
    "nav_features": "المميزات",
    "nav_themes": "المواضيع",
    "nav_games": "الألعاب",
    "nav_download": "تحميل",
    "nav_language": "اللغة",
    "hero_title": "3M - منشئ TXT",
    "hero_subtitle": "منشئ ملفات نصية مع موضوعات مخصصة وألعاب مدمجة",
    "hero_btn": "تحمل الآن",
    "features_title": "المميزات الرئيسية",
    "features_subtitle": "كل ما تحتاجه لإنشاء ملفات نصية احترافية",
    "feature1_title": "منشئ ملفات TXT",
    "feature1_desc": "أنشئ ملفات نصية بأي حجم مع التحكم الكامل. واجهة بديهية وقوية لجميع احتياجات إنشاء النصوص الخاصة بك.",
    "feature1_item1": "إنشاء سريع",
    "feature1_item2": "حجم قابل للتخصيص",
    "feature1_item3": "تنسيق محسّن",
    "feature2_title": "محرر المواضيع",
    "feature2_desc": "خصص بيئة عملك باستخدام محرر المواضيع المتقدم لدينا. أنشئ واجهات فريدة مناسبة لأسلوبك.",
    "feature2_item1": "موضوعات متعددة",
    "feature2_item2": "ألوان قابلة للتخصيص",
    "feature2_item3": "معاينة في الوقت الفعلي",
    "feature3_title": "آلة حاسبة مدمجة",
    "feature3_desc": "آلة حاسبة حديثة وسلسة مدمجة مباشرة في التطبيق لإجراء عمليات حسابية سريعة دون مغادرة الواجهة.",
    "feature3_item1": "واجهة حديثة",
    "feature3_item2": "حسابات فورية",
    "feature3_item3": "تصميم أنيق",
    "themes_title": "المواضيع المذهلة",
    "themes_subtitle": "انغمس في بيئات بصرية غامرة",
    "theme_ocean": "🌊 موضوع المحيط",
    "theme_ocean_desc": "تنقل عبر كون مائي مع فقاعات طافية وأجواء بحرية مريحة. مثالية للجلسات العمل الطويلة.",
    "theme_galactic": "🌌 موضوع جالاكتيك",
    "theme_galactic_desc": "استكشف النجوم باستخدام موضوع مجرة ​​متحرك. السفر عبر الكون اللانهائي مع ألوان كونية مبهرة.",
    "theme_matrix": "💚 موضوع مصفوفة",
    "theme_matrix_desc": "انغمس في الكود باستخدام موضوع Matrix. جو هاكر كلاسيكي مع أحرف خضراء مضيئة على خلفية سوداء.",
    "games_title": "الألعاب المدمجة",
    "games_subtitle": "خذ فترة راحة مع ألعابنا الممتعة",
    "game_dino": "🦖 Chrome Dino - لعبة مخفية",
    "game_dino_desc": "بيضة عيد فصح استثنائية تنتظرك! اكتشف لعبة الديناصور المخفية هذه واستمتع بتجربة ألعاب ريترو مدمنة مباشرة في التطبيق.",
    "game_easter_egg": "بيضة عيد الفصح",
    "game_unlock": "فتح",
    "download_title": "هل أنت جاهز للبدء؟",
    "download_subtitle": "قم بتحميل 3M - منشئ TXT الآن وحول سير عملك",
    "download_opensource": "تحميل المصدر المفتوح",
    "download_info": "الإصدار 1.0 - مجاني بالكامل ومفتوح المصدر",
    "stats_languages": "اللغات المدعومة",
    "stats_themes": "المواضيع المتحركة",
    "stats_files": "الملفات المراد إنشاؤها",
    "stats_game": "لعبة سرية",
    "footer_about": "حول",
    "footer_about_text": "3M تطبيق سطح مكتب حديث يجمع بين إنشاء ملفات نصية مع موضوعات جميلة وألعاب مخفية.",
    "footer_links": "روابط سريعة",
    "footer_social": "الشبكات الاجتماعية",
    "footer_bottom": "حر الاستخدام ومفتوح المصدر.",
    "notification_download": "التحميل جاري التحضير...",
    "modal_select_language": "اختر اللغة",
    "download_modal_title": "📥 تحميل نسخة",
    "download_loading": "جاري تحميل النسخ...",
    "download_no_versions": "لا توجد نسخ متاحة",
    "download_error": "خطأ في تحميل النسخ",
    "download_button": "تحميل"
  }
};
let currentLanguage = localStorage.getItem('siteLanguage') || 'fr';

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#language') {
            e.preventDefault();
            const modal = document.getElementById('languageModal');
            if (modal) {
                modal.style.display = 'block';
            }
            return;
        }

        if (href === '#top') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize language system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
});

// Initialize language system
function initializeLanguage() {
    // Apply saved language or default (French)
    applyLanguage(currentLanguage);
    
    // Set active language button
    updateActiveLanguageButton();
    
    // Setup modal handlers
    setupLanguageModal();
    
    // Setup download button handlers
    setupDownloadButtons();

    // Setup comment section behavior
    setupCommentSection();
}

// Apply language translations to all elements
function applyLanguage(lang) {
    if (!allLanguages[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('siteLanguage', lang);
    
    const translations = allLanguages[lang];
    console.log('applyLanguage', lang, translations ? 'OK' : 'missing');
    
    // Update all text content
    const translations_map = {
        'nav_language': '.nav-menu a[href="#language"]',
        'nav_features': '.nav-menu a[href="#features"]',
        'nav_themes': '.nav-menu a[href="#themes"]',
        'nav_games': '.nav-menu a[href="#games"]',
        'nav_download': '.nav-menu a[href="#top"]',
        // footer quick links
        'footer_feature_link': '.footer-section:nth-child(2) ul li:nth-child(1) a',
        'footer_theme_link': '.footer-section:nth-child(2) ul li:nth-child(2) a',
        'footer_game_link': '.footer-section:nth-child(2) ul li:nth-child(3) a',
        'hero_title': '.hero-title',
        'hero_subtitle': '.hero-subtitle',
        'hero_btn': '.cta-button',
        'features_title': '.features .section-title h2',
        'features_subtitle': '.features .section-title p',
        'feature1_title': '.feature-card:nth-child(1) h3',
        'feature1_desc': '.feature-card:nth-child(1) > .feature-content > p',
        'feature1_item1': '.feature-card:nth-child(1) .feature-list li:nth-child(1)',
        'feature1_item2': '.feature-card:nth-child(1) .feature-list li:nth-child(2)',
        'feature1_item3': '.feature-card:nth-child(1) .feature-list li:nth-child(3)',
        'feature2_title': '.feature-card:nth-child(2) h3',
        'feature2_desc': '.feature-card:nth-child(2) > .feature-content > p',
        'feature2_item1': '.feature-card:nth-child(2) .feature-list li:nth-child(1)',
        'feature2_item2': '.feature-card:nth-child(2) .feature-list li:nth-child(2)',
        'feature2_item3': '.feature-card:nth-child(2) .feature-list li:nth-child(3)',
        'feature3_title': '.feature-card:nth-child(3) h3',
        'feature3_desc': '.feature-card:nth-child(3) > .feature-content > p',
        'feature3_item1': '.feature-card:nth-child(3) .feature-list li:nth-child(1)',
        'feature3_item2': '.feature-card:nth-child(3) .feature-list li:nth-child(2)',
        'feature3_item3': '.feature-card:nth-child(3) .feature-list li:nth-child(3)',
        'themes_title': '.themes .section-title h2',
        'themes_subtitle': '.themes .section-title p',
        'theme_ocean': '.ocean-theme h3',
        'theme_ocean_desc': '.ocean-theme p',
        'theme_galactic': '.galactic-theme h3',
        'theme_galactic_desc': '.galactic-theme p',
        'theme_matrix': '.matrix-theme h3',
        'theme_matrix_desc': '.matrix-theme p',
        'games_title': '.games .section-title h2',
        'games_subtitle': '.games .section-title p',
        'game_dino': '.game-card h3',
        'game_dino_desc': '.game-card p:first-of-type',
        'game_easter_egg': '.game-tags .easter-egg',
        'game_unlock': '.game-tags .unlock',
        'download_title': '.download .download-content h2',
        'download_subtitle': '.download .download-content > p',
        'download_opensource': '.download-open-source',
        'download_info': '.download-info p',
        'stats_languages': '.stat-item:nth-child(1) p',
        'stats_themes': '.stat-item:nth-child(2) p',
        'stats_files': '.stat-item:nth-child(3) p',
        'stats_game': '.stat-item:nth-child(4) p',
        'footer_about': '.footer-section:nth-child(1) h4',
        'footer_about_text': '.footer-section:nth-child(1) p',
        'footer_links': '.footer-section:nth-child(2) h4',
        'footer_social': '.footer-section:nth-child(3) h4',
        'footer_bottom': '.footer-bottom p'
    };
    
    for (const [key, selector] of Object.entries(translations_map)) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            if (translations[key]) {
                elem.textContent = translations[key];
            }
        });
    }
    
    // Update modal title
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle && translations.modal_select_language) {
        modalTitle.textContent = translations.modal_select_language;
    }

    // Update download modal texts
    const downloadModalTitle = document.getElementById('downloadModalTitle');
    if (downloadModalTitle && translations.download_modal_title) {
        downloadModalTitle.textContent = translations.download_modal_title;
    }
    
    const downloadLoadingText = document.getElementById('downloadLoadingText');
    if (downloadLoadingText && translations.download_loading) {
        downloadLoadingText.textContent = translations.download_loading;
    }
    
    const downloadErrorText = document.getElementById('downloadErrorText');
    if (downloadErrorText && translations.download_error) {
        downloadErrorText.textContent = translations.download_error;
    }

    // Ensure nav labels are applied explicitly
    const navTranslationTargets = [
        ['nav_language', '#language'],
        ['nav_features', '#features'],
        ['nav_themes', '#themes'],
        ['nav_games', '#games'],
        ['nav_download', '#top']
    ];

    navTranslationTargets.forEach(([key, href]) => {
        const navEl = document.querySelector(`.nav-menu a[href="${href}"]`);
        if (navEl && translations[key]) {
            navEl.textContent = translations[key];
        }
    });

    // Footer quick links
    const footerFeatureLink = document.querySelector('.footer-section:nth-child(2) ul li:nth-child(1) a');
    const footerThemeLink = document.querySelector('.footer-section:nth-child(2) ul li:nth-child(2) a');
    const footerGameLink = document.querySelector('.footer-section:nth-child(2) ul li:nth-child(3) a');

    if (footerFeatureLink && translations.nav_features) footerFeatureLink.textContent = translations.nav_features;
    if (footerThemeLink && translations.nav_themes) footerThemeLink.textContent = translations.nav_themes;
    if (footerGameLink && translations.nav_games) footerGameLink.textContent = translations.nav_games;

    
    // Update active button
    updateActiveLanguageButton();
}

function updateActiveLanguageButton() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.lang-btn[data-lang="${currentLanguage}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function setupLanguageModal() {
    const modal = document.getElementById('languageModal');
    const closeBtn = document.querySelector('.close');
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Open modal when Language link is clicked
    const languageLink = document.getElementById('languageLink') || document.querySelector('a[href="#language"]');
    if (languageLink) {
        languageLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Language selection buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            applyLanguage(lang);
            modal.style.display = 'none';
        });
    });
    
    // Close when clicking outside modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function isDownloadExtension(fileName) {
    const extensions = ['.exe', '.msi', '.apk', '.dmg', '.app', '.zip', '.cab', '.tar', '.gz', '.7z'];
    const lower = fileName.toLowerCase();
    return extensions.some(ext => lower.endsWith(ext));
}

async function fetchVersionsFromJsonFile() {
    try {
        const response = await fetch('vertions.json', { cache: 'no-cache' });
        if (!response.ok) {
            console.warn(`fetch vertions.json: statut ${response.status}, fallback`);
            return FALLBACK_VERSIONS;
        }
        const data = await response.json();
        if (data.versions && Array.isArray(data.versions)) {
            if (data.versions.length > 0) {
                console.log('fetchVersionsFromJsonFile: versions extraites de vertions.json', data.versions.length);
                return data.versions;
            } else {
                console.warn('vertions.json est vide ; fallback utilisé');
                return FALLBACK_VERSIONS;
            }
        } else {
            console.error('vertions.json: structure invalide ou vide - veuillez corriger.');
            return [];
        }
    } catch (error) {
        console.error('Impossible de charger vertions.json:', error.message);
        return [];
    }
}

function normalizeUrlPath(url) {
    if (!url.endsWith('/')) url += '/';
    return url;
}

// Download button functionality
async function loadVersions() {
    const versionsList = document.getElementById('versionsList');
    const versionsLoading = document.getElementById('versionsLoading');
    const versionsError = document.getElementById('versionsError');

    const translations = allLanguages[currentLanguage] || allLanguages['en'];
    const downloadButtonText = translations.download_button || 'Download';
    const noVersionsText = translations.download_no_versions || 'No versions available';

    versionsList.innerHTML = '';
    versionsError.style.display = 'none';
    versionsLoading.style.display = 'block';

    let versions = await fetchVersionsFromJsonFile();
    console.log('loadVersions: versions depuis vertions.json', versions);

    if (!Array.isArray(versions) || versions.length === 0) {
        versionsLoading.style.display = 'none';
        versionsError.style.display = 'block';
        versionsError.innerHTML = `<p><i class="fas fa-exclamation-circle"></i> ${noVersionsText}</p>`;
        return;
    }

    versionsLoading.style.display = 'none';

    versions.forEach(version => {
        const card = document.createElement('div');
        card.className = 'version-card';
        card.innerHTML = `
            <div class="version-name">${version.name}</div>
            <div class="version-file">${version.file}</div>
            <div class="version-size"><i class="fas fa-info-circle"></i> ${version.size} MB</div>
            <a href="${version.path}" class="download-version-btn" download>
                <i class="fas fa-download"></i> ${downloadButtonText}
            </a>
        `;
        versionsList.appendChild(card);
    });
}

// Opens the download modal and loads version list
function openDownloadModal() {
    const downloadModal = document.getElementById('downloadModal');
    if (!downloadModal) return;

    downloadModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    loadVersions();
}

// Setup download buttons
function setupDownloadButtons() {
    const topDownloadBtn = document.getElementById('downloadBtn');
    const downloadModal = document.getElementById('downloadModal');
    const closeDownloadBtn = document.querySelector('.close-download');
    
    console.log('🔍 DEBUG:', {
        topDownloadBtn: topDownloadBtn ? 'EXISTS' : 'MISSING',
        downloadModal: downloadModal ? 'EXISTS' : 'MISSING'
    });

    if (topDownloadBtn) {
        console.log('✅ Écouteur ajouté à downloadBtn');
        topDownloadBtn.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('🎯 CLICK détecté sur downloadBtn');
            openDownloadModal();
        });
    } else {
        console.error('❌ downloadBtn NOT FOUND');
    }

    // Direct download button for quicker usage
    const directDownloadBtn = document.getElementById('directDownloadBtn');
    if (directDownloadBtn) {
        directDownloadBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const directUrl = 'https://github.com/vouimet109-png/3M/tree/3M-Windows-1.0-source-code';
            window.location.href = directUrl;
        });
    }

    if (closeDownloadBtn) {
        closeDownloadBtn.addEventListener('click', function() {
            downloadModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == downloadModal) {
            downloadModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Navbar download button
    const navDownloadBtn = document.querySelector('.btn-download');
    if (navDownloadBtn) {
        navDownloadBtn.addEventListener('click', function(event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Comments storage utilities
function getComments() {
    const raw = localStorage.getItem('downloadComments');
    if (!raw) return [];
    try {
        const saved = JSON.parse(raw);
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveComments(comments) {
    localStorage.setItem('downloadComments', JSON.stringify(comments));
}

function renderCommentPagination(totalPages) {
    const paginationContainer = document.getElementById('commentsPagination');
    if (!paginationContainer) return;

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let html = '<div class="pagination-controls">';
    html += `<button id="prevPageBtn" ${currentCommentPage === 0 ? 'disabled' : ''}>Précédent</button>`;
    html += `<span>Page ${currentCommentPage + 1} / ${totalPages}</span>`;
    html += `<button id="nextPageBtn" ${currentCommentPage === totalPages - 1 ? 'disabled' : ''}>Suivant</button>`;
    html += '</div>';

    paginationContainer.innerHTML = html;

    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentCommentPage > 0) {
                currentCommentPage -= 1;
                renderComments();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentCommentPage < totalPages - 1) {
                currentCommentPage += 1;
                renderComments();
            }
        });
    }
}

function renderComments() {
    const commentsList = document.getElementById('commentsList');
    const paginationContainer = document.getElementById('commentsPagination');
    if (!commentsList || !paginationContainer) return;

    const comments = getComments();
    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="color: rgba(255,255,255,0.85);">Aucun commentaire pour l’instant.</p>';
        paginationContainer.innerHTML = '';
        return;
    }

    const totalPages = Math.max(1, Math.ceil(comments.length / COMMENTS_PER_PAGE));
    if (currentCommentPage >= totalPages) {
        currentCommentPage = totalPages - 1;
    }

    const start = currentCommentPage * COMMENTS_PER_PAGE;
    const pageComments = comments.slice(start, start + COMMENTS_PER_PAGE);

    commentsList.innerHTML = pageComments
        .map(comment => {
            const isLiked = comment.vote === 'like';
            const isDisliked = comment.vote === 'dislike';
            const replies = Array.isArray(comment.replies) ? comment.replies : [];

            const repliesHtml = replies.length > 0 ? replies.map(reply => `
                <div class="reply-card">
                    <p>${reply.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                    <div class="reply-meta">${new Date(reply.createdAt).toLocaleString()}</div>
                </div>
            `).join('') : '<p style="color: rgba(255,255,255,0.8);">Pas encore de réponses.</p>';

            return `
                <div class="comment-card" data-id="${comment.id}">
                    <p>${comment.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                    <div class="comment-meta">Posté le ${new Date(comment.createdAt).toLocaleString()}</div>
                    <div class="comment-actions">
                        <button class="like-btn ${isLiked ? 'active' : ''}" data-id="${comment.id}">
                            <i class="fas fa-thumbs-up"></i> ${comment.likes || 0}
                        </button>
                        <button class="dislike-btn ${isDisliked ? 'active' : ''}" data-id="${comment.id}">
                            <i class="fas fa-thumbs-down"></i> ${comment.dislikes || 0}
                        </button>
                        <button class="reply-toggle-btn" data-id="${comment.id}">Répondre</button>
                    </div>
                    <div class="reply-form" id="reply-form-${comment.id}" style="display:none; margin-top:0.75rem;">
                        <textarea class="reply-input" data-id="${comment.id}" rows="2" placeholder="Réponse..."></textarea>
                        <button class="reply-submit-btn" data-id="${comment.id}">Envoyer</button>
                    </div>
                    <div class="reply-list">
                        <h4>Réponses</h4>
                        ${repliesHtml}
                    </div>
                </div>
            `;
        })
        .join('');

    renderCommentPagination(totalPages);

    commentsList.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            updateCommentVote(id, 'likes');
        });
    });

    commentsList.querySelectorAll('.dislike-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            updateCommentVote(id, 'dislikes');
        });
    });

    commentsList.querySelectorAll('.reply-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const form = document.getElementById(`reply-form-${id}`);
            if (!form) return;
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        });
    });

    commentsList.querySelectorAll('.reply-submit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const textarea = commentsList.querySelector(`.reply-input[data-id="${id}"]`);
            if (!textarea) return;
            const text = textarea.value.trim();
            if (!text) return;
            addReply(id, text);
            textarea.value = '';
        });
    });
}

function updateCommentVote(id, type) {
    const comments = getComments();
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) return;

    const comment = comments[index];

    if (type === 'likes') {
        if (comment.vote === 'like') {
            // annuler le like
            comment.likes = Math.max((comment.likes || 1) - 1, 0);
            comment.vote = null;
        } else {
            if (comment.vote === 'dislike') {
                comment.dislikes = Math.max((comment.dislikes || 1) - 1, 0);
            }
            comment.likes = (comment.likes || 0) + 1;
            comment.vote = 'like';
        }
    } else if (type === 'dislikes') {
        if (comment.vote === 'dislike') {
            // annuler le dislike
            comment.dislikes = Math.max((comment.dislikes || 1) - 1, 0);
            comment.vote = null;
        } else {
            if (comment.vote === 'like') {
                comment.likes = Math.max((comment.likes || 1) - 1, 0);
            }
            comment.dislikes = (comment.dislikes || 0) + 1;
            comment.vote = 'dislike';
        }
    }

    saveComments(comments);
    renderComments();
}

function addReply(commentId, replyText) {
    const comments = getComments();
    const index = comments.findIndex(comment => comment.id === commentId);
    if (index === -1) return;

    const reply = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        text: replyText,
        createdAt: Date.now()
    };

    if (!Array.isArray(comments[index].replies)) {
        comments[index].replies = [];
    }

    comments[index].replies.push(reply);
    saveComments(comments);
    renderComments();
}

// Comments section handling
function setupCommentSection() {
    const submitBtn = document.getElementById('commentSubmit');
    const commentInput = document.getElementById('downloadComment');
    const feedback = document.getElementById('commentFeedback');

    if (!submitBtn || !commentInput || !feedback) {
        return;
    }

    renderComments();

    submitBtn.addEventListener('click', function() {
        const text = commentInput.value.trim();
        if (!text) {
            feedback.textContent = 'Veuillez écrire un commentaire avant d’envoyer.';
            feedback.style.color = '#ffc107';
            return;
        }

        const comments = getComments();
        comments.unshift({
            id: Date.now().toString() + Math.random().toString(36).slice(2),
            text,
            createdAt: Date.now(),
            likes: 0,
            dislikes: 0,
            replies: []
        });

        saveComments(comments);
        currentCommentPage = 0;
        renderComments();

        feedback.textContent = 'Merci pour votre commentaire !';
        feedback.style.color = '#9dffcc';
        commentInput.value = '';
    });
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card, .game-card, .theme-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
});

// Add interactivity to stats
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
};

// Trigger animation when stats section is visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-item').forEach((stat, index) => {
                const number = stat.querySelector('h3');
                const text = number.textContent;
                
                if (text !== '∞') {
                    const value = parseInt(text);
                    animateCounter(number, value);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// Theme preview hover effect
document.querySelectorAll('.theme-item').forEach(theme => {
    theme.addEventListener('click', function() {
        document.querySelectorAll('.theme-item').forEach(t => {
            t.style.opacity = '0.8';
        });
        this.style.opacity = '1';
    });
});

// Mobile menu toggle simulation
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect on hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    if (scrollTop < window.innerHeight) {
        hero.style.backgroundPosition = `0 ${scrollTop * 0.5}px`;
    }
});

// Initialize AOS-like animations
document.querySelectorAll('[class*="card"], [class*="section"]').forEach(element => {
    element.style.opacity = '0';
    element.style.animation = 'fadeIn 0.6s ease forwards';
});

// Add fade-in keyframes
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Log message
console.log('%c🎉 Welcome to 3M - TXT Generator!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cEnjoy exploring the website and discover all the amazing features!', 'font-size: 14px; color: #764ba2;');

