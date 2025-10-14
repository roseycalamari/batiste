/**
 * BG Tennisschule - Complete Interactive Application
 * Production-ready JavaScript implementation with comprehensive functionality
 * @version 1.0.0
 * @author BG Tennisschule Development Team
 */

(function() {
    'use strict';

    // Application Configuration
    const CONFIG = {
        defaultLanguage: 'de-CH',
        animationDelay: 100,
        scrollOffset: 80,
        debounceDelay: 16,
        formSubmissionDelay: 2000,
        messageDisplayDuration: 5000,
        breakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        }
    };

    /**
     * Main Application Class - Singleton Pattern Implementation
     */
    class BGTennisschuleApp {
        constructor() {
            if (BGTennisschuleApp.instance) {
                return BGTennisschuleApp.instance;
            }
            
            BGTennisschuleApp.instance = this;
            
            // Application state management
            this.state = {
                currentLanguage: this.getStoredLanguage() || CONFIG.defaultLanguage,
                isMenuOpen: false,
                isScrolling: false,
                intersectionObserver: null,
                resizeObserver: null,
                formSubmitting: false,
                lastScrollTop: 0,
                isHeaderHidden: false,
                heroHeight: 0,
                galleryImages: [],
                currentImageIndex: 0,
                isGalleryModalOpen: false
            };
            
            this.elements = {};
            this.eventListeners = new Map();
            
            this.initialize();
        }

        /**
         * Comprehensive translation database with validation
         */
        translations = {
            'de-CH': {
                // Page Title
                page_title: 'Tennisschule Batiste Guerra (Tennis School Batiste Guerra) | Mehr als nur Tennis',
                
                // Navigation
                nav_home: 'Home',
                nav_about: 'Über mich',
                nav_programs: 'Programme',
                nav_news: 'News & Camps',
                nav_coaches: 'Cheftrainer',
                nav_gallery: 'Galerie',
                nav_contact: 'Kontakt',
                // News Section
                news_title: 'News & Camps',
                news_subtitle: 'Aktuelle Updates, Camps und Events',
                // News items
                news1_alt: 'Camp Ali Bey Club Manavgat',
                news1_date: '12. August 2025',
                news1_title: 'Vision & Passion Tenniscamp im Ali Bey Club Manavgat',
                news1_text: 'Erlebe eine unvergessliche Woche voller Sport, Sonne und Spass – direkt am Meer! Unser Tenniscamp im wunderschönen Ali Bey Club Manavgat (Türkei) verbindet professionelles Tennistraining mit Entspannung, Genuss und Geselligkeit.',
                news2_alt: 'Auslandscamp 2025 Antalya',
                news2_date: '08. Oktober 2024',
                news2_title: 'Auslandscamp 2025: Tennis und Erholung in Antalya, Türkei',
                news2_text: 'Melde dich jetzt für unser All-Inclusive-Tenniscamp vom 12. bis 19. April 2025 an. Geniesse Training und Erholung im 5-Sterne-Hotel am Meer, mit über 60 Tennisplätzen und einer großartigen Tennis-Community. Interesse? Schreibe uns eine E-Mail für mehr Infos! Anmeldeschluss ist der 20. Oktober 2024.',
                news3_alt: 'Unterrichtsangebote 2024',
                news3_date: '10. Juni 2024',
                news3_title: 'TENNISUNTERRICHT & CAMPS 2024',
                news3_text: 'TC Basel West & SERVETENNIS: Unterrichtsangebote 2024',
                news4_alt: 'Universitätssport Kooperation',
                news4_date: '09. Juni 2024',
                news4_title: 'Universitätssport',
                news4_text: 'Der TC Basel West und die Uni Basel kooperieren für Sportkurse. Im August und September werden deshalb am Mittwoch Abend die Plätze besetzt sein.',
                news5_alt: 'Neues Design TC Basel West',
                news5_date: '08. Juni 2024',
                news5_title: 'Neues Design',
                news5_text: 'Neuer Look für den TC Basel West: Eine Erfrischende Veränderung',
                
                // Camp detail page
                camp_page_title: 'Vision & Passion Tenniscamp – Ali Bey Club Manavgat',
                camp_hero_title: 'Vision & Passion Tenniscamp',
                camp_hero_subtitle: '12. August 2025 • Ali Bey Club Manavgat',
                camp_hero_dates: '04. - 11. April 2026',
                camp_hero_location: 'Türkische Riviera',
                camp_intro_title: 'Mit Batiste Guerra & Nicolas Ernst',
                camp_intro_dates: '04. - 11. April 2026',
                camp_intro_location: 'Ali Bey Club Manavgat',
                camp_intro_text1: 'Vom Samstag 04. April bis Samstag 11. April 2026 findet unser nächstes Vision & Passion Tenniscamp im traumhaften Ali Bey Club Manavgat an der türkischen Riviera statt.',
                camp_intro_text2: 'Ob ambitionierte Tennisspielerin, engagierter Freizeitspieler oder einfach Fan von Sonne, Bewegung und Genuss – dieses Camp bietet für alle etwas. Intensives Training, erholsame Ferientage, köstliche All-inclusive-Verpflegung und ein vielfältiges Freizeitangebot direkt am Meer.',
                camp_features_title: 'Was dich erwartet',
                camp_feature_training_title: 'Professionelles Training',
                camp_feature_training_text: '5 Tage betreutes Tennistraining (10h oder 20h wählbar) mit Gruppen-Einteilung nach Spielniveau',
                camp_feature_courts_title: '62 Sandplätze',
                camp_feature_courts_text: 'Freies Spiel auf über 62 gepflegten Sandplätzen mit trainigsfreiem Mittwoch für Ausflüge',
                camp_feature_dining_title: 'All-Inclusive Verpflegung',
                camp_feature_dining_text: 'Hochwertige Verpflegung in einem 5-Sterne Hotel mit Begrüssungsapéro inklusive',
                camp_feature_wellness_title: 'Wellness & Freizeit',
                camp_feature_wellness_text: 'Fitnesscenter, Kursangebote, riesiger Spa-Bereich und gigantischer Water- & Adventurepark',
                camp_travel_title: 'Reisedaten & Leistungen',
                camp_travel_date_title: 'Reisedaten',
                camp_travel_date_text: 'Samstag, 04. April bis Samstag, 11. April 2026',
                camp_travel_flight_title: 'Flug & Transfer',
                camp_travel_flight_text: 'Flug und Flughafentransfer sind im Preis inbegriffen',
                camp_travel_custom_title: 'Individuelle Wünsche',
                camp_travel_custom_text: 'Individuelle Wünsche zu Flügen/Transfers möglich (Kosten selbst zu tragen)',
                camp_travel_insurance_title: 'Versicherung',
                camp_travel_insurance_text: 'Reiserücktrittsversicherung auf Wunsch über externe Anbieter',
                camp_participants_title: 'Teilnehmerzahl & Zielgruppe',
                camp_participants_age_title: 'Altersgruppe',
                camp_participants_age_text: 'Offen für alle ab ca. 6 Jahren – ob Anfänger:in oder Fortgeschrittene:r',
                camp_participants_groups_title: 'Gruppeneinteilung',
                camp_participants_groups_text: 'Gruppen werden dem Spielniveau entsprechend eingeteilt',
                camp_participants_number_title: 'Teilnehmerzahl',
                camp_participants_number_text: 'Mindestens 20, maximal ca. 100 Teilnehmende',
                camp_prices_title: 'Preise pro Person in CHF',
                camp_prices_10h: '10h Training',
                camp_prices_20h: '20h Training',
                camp_prices_10h_label: '10 Stunden',
                camp_prices_20h_label: '20 Stunden',
                camp_prices_adults: 'Erwachsene',
                camp_prices_students: 'Schüler:innen / Studierende',
                camp_prices_kids: 'Kinder unter 12 Jahren',
                camp_prices_companions: 'Begleitpersonen',
                camp_prices_no_training: 'Ohne Training',
                camp_prices_under_12: 'unter 12 Jahre',
                camp_prices_12_plus: 'ab 12 Jahren',
                camp_rooms_title: 'Zimmer-Aufschläge',
                camp_rooms_single: 'Einzelbelegung im Doppelzimmer',
                camp_rooms_single_desc: 'Zusätzliche Kosten für Einzelbelegung',
                camp_rooms_superior: 'Superior Doppelzimmer',
                camp_rooms_superior_desc: 'Upgrade auf Superior Zimmer',
                camp_rooms_superior_single: 'Superior DZ zur Alleinbenutzung',
                camp_rooms_superior_single_desc: 'Superior Zimmer für eine Person',
                camp_cancellation_title: 'Stornobedingungen',
                camp_cancellation_1: '59–15 Tage vor Anreise',
                camp_cancellation_1_fee: '50% Stornogebühr',
                camp_cancellation_2: '14–1 Tage vor Anreise',
                camp_cancellation_2_fee: '80% Stornogebühr',
                camp_cancellation_3: 'No Show oder vorzeitige Abreise',
                camp_cancellation_3_fee: '100% Stornogebühr',
                camp_cta_title: 'Jetzt dabei sein!',
                camp_cta_subtitle: 'Sichere dir jetzt deinen Platz im Vision & Passion Tenniscamp und erlebe unvergessliche Tage voller Sport, Sonne und Gemeinschaft.',
                camp_cta_register: 'Jetzt zum Camp anmelden',
                camp_cta_info: 'Mehr Infos zur Anlage',
                camp_gallery_title: 'Camp Impressionen',
                camp_gallery_subtitle: 'Einblicke in das Vision & Passion Tenniscamp',

                // Hero Section
                hero_title: 'Tennisschule Batiste Guerra',
                hero_subtitle: 'Mehr als nur Tennis',
                hero_cta: 'Über mich',

                // About Section
                about_title: 'Über mich',
                about_subtitle: 'Exzellenz in der Tennis-Ausbildung',
                about_heading: 'Meine Philosophie',
                about_text1: 'In der Tennisschule Batiste Guerra ist Tennis mehr als nur ein Sport—es ist eine Leidenschaft, die ich mit Ihnen teilen möchte.',
                about_text2: 'Ich glaube fest daran, dass jeder das Potenzial hat, auf dem Tennisplatz zu blühen, unabhängig davon, ob Sie gerade zum ersten Mal einen Schläger in die Hand nehmen oder schon lange spielen.',
                stat_students: 'Ausgebildete Schüler',
                stat_years: 'Jahre Erfahrung',
                stat_courts: 'Tennisplätze',
                best_ranking: 'Beste Platzierung',

                // Our Mission Section
                our_mission_title: 'Meine Mission',
                our_mission_subtitle: 'Die Reise von Leidenschaft und Exzellenz',
                our_mission_text1: 'Meine Mission ist es, Sie genau dort zu treffen, wo Sie stehen. Deshalb lege ich großen Wert auf individuelles Training und persönliche Betreuung.',
                our_mission_text2: 'Ihr Fortschritt treibt mich an, und Ihre Erfolge, egal wie klein, sind meine größte Motivation.',
                our_mission_text3: 'Mit positiver Energie, Expertise und der nötigen Geduld helfe ich Ihnen, Ihre Technik zu verfeinern, Ihre Taktik zu schärfen und die Freude am Spiel zu erleben.',
                our_mission_text4: 'Kommen Sie vorbei und werden Sie Teil meiner Tennisschule. Ich freue mich darauf, Sie auf Ihrer Reise zu begleiten und Ihre Leidenschaft für diesen großartigen Sport zu wecken!',
                
                // Mission Points
                mission_point_meet: 'Ich treffe Sie dort, wo Sie sind',
                mission_point_training: 'Individuelles Training',
                mission_point_progress: 'Ihr Fortschritt treibt mich an',
                mission_point_success: 'Jeder Erfolg zählt',
                mission_point_family: 'Werden Sie Teil meiner Tennisschule',
                
                // All Ages Section
                all_ages_title: 'Tennisstunden',
                all_ages_subtitle: 'Tennisstunden für Junioren und Erwachsene. Ob Sie zum ersten Mal einen Schläger in die Hand nehmen oder Ihr Spiel verbessern möchten – ich biete Programme, die auf Ihr Können zugeschnitten sind.',
                juniors_title: 'Junioren',
                juniors_age: 'Alter 5-17',
                juniors_description: 'Meine Jugendprogramme richten sich an alle Spielniveaus – vom Anfänger, der den Tennissport entdeckt, bis hin zum Nachwuchsspieler, der sich auf Turniere vorbereitet. Mit einer Mischung aus Spaß, Techniktraining, Matchpraxis und fortgeschrittenen Übungen mache ich Tennis für alle erlebbar – egal ob Freizeit, Fitness oder Wettkampf im Vordergrund steht.',
                adults_title: 'Erwachsene',
                adults_age: 'Alter 18+',
                adults_description: 'Meine Erwachsenenprogramme sind für jedes Niveau geeignet – ob Sie zum ersten Mal den Schläger in die Hand nehmen, auf der Suche nach einem aktiven Freizeitausgleich sind oder Ihr Spiel auf Wettkampfniveau verbessern möchten. Mit flexiblen Abend- und Wochenendterminen biete ich Fitness, Techniktraining, geselliges Spiel und intensives Training – ganz nach Ihren persönlichen Zielen.',
                lesson_duration: '55 Minuten pro Einheit',
                private_lessons: 'Einzelstunden',
                private_type: 'Privat',
                semi_private_type: 'Semi-privat',
                group_lessons: 'Gruppenstunden',
                per_person: '(pro Person)',
                three_persons: '3 Personen',
                four_persons: '4 Personen',
                five_persons: '5 Personen',
                pricing_note: 'Hinweis:',
                non_member_fee: 'CHF 15 pro Lektion für Nicht‑Mitglieder (aufgeteilt auf alle Nicht‑Mitglieder) – nur bei Spielen im TC Basel West (Outdoor).',
                view_more: 'Mehr erfahren',
                contact_us_button: 'Kontaktieren Sie mich',
                
                // Coach Section
                coach_name: 'Batiste Guerra',
                coach_role: 'Cheftrainer & Gründer',
                coach_experience: 'Wettkampftrainer C • ITF Tour Spieler',
                coach_years: '10 Jahre Erfahrung',
                coach_bio: 'Als ITF Spieler besiegte ich drei Spieler aus den ATP Top 1000 sowie einen aus den ATP Top 700. Mit über 10 Jahren Coaching-Erfahrung entwickle ich Spieler aller Niveaus – von Anfängern bis hin zu Wettkampfsportlern. Tennis ist meine grosse Leidenschaft und ich hoffe das Feuer in dir wecken zu können.',
                coach_license: 'Wettkampftrainer C Tennislehrer',
                specialty_competition: 'Wettkampftraining',
                specialty_mental: 'Mentale Strategie',
                specialty_match: 'Matchvorbereitung',
                specialty_sparring_r3: 'Sparring ab R3',
                specialty_ic_team_prep: 'IC Vorbereitung für Mannschaften',
                specialty_tournament_support: 'Turnierbegleitung',
                coached_students: 'Gecoachte Schüler',
                years_experience: 'Jahre Erfahrung',
                credentials_title: 'Tennis-Training Erfolge',
                credential_1: 'Zertifizierter Wettkampftrainer C Swiss Tennis',
                credential_2: 'Beste Platzierung in der Schweiz N3(45)',
                credential_3: 'Beste Platzierung im Ausland 400 ITF',
                credential_4: 'Noch aktiv auf der internationalen ITF-Tour weltweit',
                credential_5: 'Schweizer Nationalmannschaft B',
                credential_6: 'Badenliga Deutschland',
                credential_7: 'Schweizer Preisgeld-Turnier',
                credential_8: '3 Jahre als Tennisprofi',
                book_session: 'Eine Session mit Batiste buchen',
                
                // Contact Section
                contact_info_title: 'Kontaktinformationen',
                contact_info_subtitle: 'Nehmen Sie Kontakt mit mir für Tennisstunden und Training auf',
                contact_address: 'TC Basel West, Buschweilerweg 29<br>4055 Basel, Schweiz',
                contact_phone: '+41 76 212 02 97',
                contact_email: 'batiste.guerra0@sunrise.ch',
                find_us_title: 'Finden Sie mich',
                find_us_subtitle: 'Besuchen Sie mich in der Tennisanlage in Basel',
                
                // Footer
                footer_title: 'Tennisschule Batiste Guerra',
                footer_slogan: 'Mehr als nur Tennis',

                // Programs Section
                programs_title: 'Meine Programme',
                programs_subtitle: 'Maßgeschneidertes Training für jedes Level',
                program_beginner_title: 'Anfänger',
                program_beginner_desc: 'Perfekt für alle, die ihre Tennis-Reise beginnen. Lernen Sie die Grundlagen mit geduldiger, fachkundiger Anleitung.',
                program_beginner_feature1: 'Grundschläge und Techniken',
                program_beginner_feature2: 'Platzpositionierung',
                program_beginner_feature3: 'Spielregeln und Etikette',
                program_intermediate_title: 'Fortgeschrittene',
                program_intermediate_desc: 'Verbessern Sie Ihre Fähigkeiten und entwickeln Sie strategisches Denken für das Wettkampfspiel.',
                program_intermediate_feature1: 'Erweiterte Schlagverfeinerung',
                program_intermediate_feature2: 'Match-Taktiken',
                program_intermediate_feature3: 'Körperliche Konditionierung',
                program_advanced_title: 'Profis',
                program_advanced_desc: 'Elite-Training für Turniervorbereitung und professionelle Entwicklung.',
                program_advanced_feature1: 'Turniervorbereitung',
                program_advanced_feature2: 'Mental-Coaching',
                program_advanced_feature3: 'Leistungsanalyse',
                program_kids_title: 'Kinder',
                program_kids_desc: 'Spaßige und ansprechende Tennis-Programme speziell für junge Spieler entwickelt.',
                program_kids_feature1: 'Altersgerechte Ausrüstung',
                program_kids_feature2: 'Spielerische Lernspiele',
                program_kids_feature3: 'Charakterentwicklung',
                learn_more: 'Mehr erfahren',

                // Coaches Section
                coaches_title: 'Cheftrainer',
                coaches_subtitle: 'Persönliche Betreuung durch den Cheftrainer',
                coach1_role: 'Cheftrainer & Gründer',
                coach1_bio: 'Ehemaliger Profispieler mit über 15 Jahren Coaching-Erfahrung. Spezialisiert auf die Entwicklung von Champions durch technische Präzision und mentale Stärke.',
                coach2_role: 'Senior-Trainerin',
                coach2_bio: 'Expertin in der Jugendentwicklung und Anfängerprogrammen. Bekannt für ihren geduldigen Ansatz und die Fähigkeit, Tennis für alle Altersgruppen zugänglich und spaßig zu machen.',
                coach3_role: 'Leistungstrainer',
                coach3_bio: 'Fokussiert auf fortgeschrittene Spieler und Turniervorbereitung. Ehemaliges Davis Cup Team-Mitglied mit umfangreicher Wettkampferfahrung.',

                // Gallery Section
                gallery_title: 'Galerie',
                gallery_subtitle: 'Momente der Exzellenz festgehalten',

                // Contact Section
                contact_title: 'Kontakt',
                contact_subtitle: 'Nehmen Sie Kontakt mit mir auf',
                form_name: 'Name',
                form_email: 'E-Mail',
                form_phone: 'Telefon',
                form_message: 'Nachricht',
                form_submit: 'Nachricht senden',
                form_sending: 'Wird gesendet...',
                form_success: 'Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.',
                form_error: 'Bitte korrigieren Sie die Fehler oben.',
                form_required: 'Dieses Feld ist erforderlich.',
                form_email_invalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
                form_phone_invalid: 'Bitte geben Sie eine gültige Telefonnummer ein.',
                contact_address_title: 'Adresse',
                contact_phone_title: 'Telefon',
                contact_email_title: 'E-Mail',
                contact_hours_title: 'Öffnungszeiten',
                contact_hours_text: 'Mo-Fr: 6:00-22:00<br>Sa-So: 8:00-20:00',

                // Footer
                footer_description: 'Schweizer Präzision trifft auf deutsche Disziplin im professionellen Tennis-Coaching.',
                footer_links_title: 'Schnelllinks',
                footer_programs_title: 'Programme',
                footer_rights: 'Alle Rechte vorbehalten.',
                
                // Menu
                menu: 'Menü',
                
                // Language labels
                lang_en: 'EN',
                lang_de: 'DE',
                
                // Alt text and labels
                tennis_ball_menu_alt: 'Tennis Ball Menu',
                logo_alt: 'BG Tennisschule Logo',
                back_to_top_label: 'Back to top',
                back_to_top_title: 'Back to top'
            },
            en: {
                // Page Title
                page_title: 'Tennisschule Batiste Guerra (Tennis School Batiste Guerra) | More than just tennis',
                
                // Navigation
                nav_home: 'Home',
                nav_about: 'About Me',
                nav_programs: 'Programs',
                nav_news: 'News & Camps',
                nav_coaches: 'Head Coach',
                nav_gallery: 'Gallery',
                nav_contact: 'Contact',
                // News Section
                news_title: 'News & Camps',
                news_subtitle: 'Latest updates, camps, and events',
                // News items
                news1_alt: 'Ali Bey Club Manavgat Camp',
                news1_date: 'August 12, 2025',
                news1_title: 'Vision & Passion Tennis Camp at Ali Bey Club Manavgat',
                news1_text: 'Experience an unforgettable week of sport, sun and fun—right by the sea! Our tennis camp at the beautiful Ali Bey Club Manavgat (Turkey) combines professional tennis training with relaxation, great food and community.',
                news2_alt: '2025 Antalya Camp',
                news2_date: 'October 8, 2024',
                news2_title: 'Overseas Camp 2025: Tennis and relaxation in Antalya, Turkey',
                news2_text: 'Register now for our all-inclusive tennis camp from April 12–19, 2025. Enjoy training and relaxation at a 5-star seaside hotel, with 60+ courts and an amazing tennis community. Interested? Email us for more info! Registration deadline: October 20, 2024.',
                news3_alt: 'Lesson offerings 2024',
                news3_date: 'June 10, 2024',
                news3_title: 'TENNIS LESSONS & CAMPS 2024',
                news3_text: 'TC Basel West & SERVETENNIS: Lesson offerings 2024',
                news4_alt: 'University sports partnership',
                news4_date: 'June 9, 2024',
                news4_title: 'University Sports',
                news4_text: 'TC Basel West and the University of Basel are cooperating on sports courses. Courts will be occupied on Wednesday evenings in August and September.',
                news5_alt: 'New design TC Basel West',
                news5_date: 'June 8, 2024',
                news5_title: 'New Design',
                news5_text: 'A fresh new look for TC Basel West',
                
                // Camp detail page
                camp_page_title: 'Vision & Passion Tennis Camp – Ali Bey Club Manavgat',
                camp_hero_title: 'Vision & Passion Tennis Camp',
                camp_hero_subtitle: 'August 12, 2025 • Ali Bey Club Manavgat',
                camp_hero_dates: 'April 4–11, 2026',
                camp_hero_location: 'Turkish Riviera',
                camp_intro_title: 'With Batiste Guerra & Nicolas Ernst',
                camp_intro_dates: 'April 4–11, 2026',
                camp_intro_location: 'Ali Bey Club Manavgat',
                camp_intro_text1: 'From Saturday April 4 to Saturday April 11, 2026, our next Vision & Passion Tennis Camp takes place at the beautiful Ali Bey Club Manavgat on the Turkish Riviera.',
                camp_intro_text2: 'Whether you\'re an ambitious tennis player, dedicated recreational player, or simply a fan of sun, movement and enjoyment – this camp offers something for everyone. Intensive training, relaxing vacation days, delicious all-inclusive dining, and a diverse leisure program right by the sea.',
                camp_features_title: 'What Awaits You',
                camp_feature_training_title: 'Professional Training',
                camp_feature_training_text: '5 days of supervised tennis training (10h or 20h selectable) with groups organized by skill level',
                camp_feature_courts_title: '62 Clay Courts',
                camp_feature_courts_text: 'Free play on over 62 well-maintained clay courts with training-free Wednesday for excursions',
                camp_feature_dining_title: 'All-Inclusive Dining',
                camp_feature_dining_text: 'High-quality dining at a 5-star hotel with welcome aperitif included',
                camp_feature_wellness_title: 'Wellness & Leisure',
                camp_feature_wellness_text: 'Fitness center, course offerings, huge spa area and giant water & adventure park',
                camp_travel_title: 'Travel Dates & Services',
                camp_travel_date_title: 'Travel Dates',
                camp_travel_date_text: 'Saturday, April 4 to Saturday, April 11, 2026',
                camp_travel_flight_title: 'Flight & Transfer',
                camp_travel_flight_text: 'Flight and airport transfer included in price',
                camp_travel_custom_title: 'Individual Requests',
                camp_travel_custom_text: 'Individual requests for flights/transfers possible (costs to be borne by yourself)',
                camp_travel_insurance_title: 'Insurance',
                camp_travel_insurance_text: 'Travel cancellation insurance available through external providers',
                camp_participants_title: 'Participants & Target Group',
                camp_participants_age_title: 'Age Group',
                camp_participants_age_text: 'Open to everyone from age 6 – whether beginner or advanced',
                camp_participants_groups_title: 'Group Organization',
                camp_participants_groups_text: 'Groups are organized by skill level',
                camp_participants_number_title: 'Number of Participants',
                camp_participants_number_text: 'Minimum 20, maximum approximately 100 participants',
                camp_prices_title: 'Prices per Person in CHF',
                camp_prices_10h: '10h Training',
                camp_prices_20h: '20h Training',
                camp_prices_10h_label: '10 Hours',
                camp_prices_20h_label: '20 Hours',
                camp_prices_adults: 'Adults',
                camp_prices_students: 'Students',
                camp_prices_kids: 'Children under 12 years',
                camp_prices_companions: 'Companions',
                camp_prices_no_training: 'No Training',
                camp_prices_under_12: 'under 12 years',
                camp_prices_12_plus: '12+ years',
                camp_rooms_title: 'Room Surcharges',
                camp_rooms_single: 'Single occupancy in double room',
                camp_rooms_single_desc: 'Additional costs for single occupancy',
                camp_rooms_superior: 'Superior double room',
                camp_rooms_superior_desc: 'Upgrade to Superior room',
                camp_rooms_superior_single: 'Superior double room for single use',
                camp_rooms_superior_single_desc: 'Superior room for one person',
                camp_cancellation_title: 'Cancellation Policy',
                camp_cancellation_1: '59–15 days before arrival',
                camp_cancellation_1_fee: '50% cancellation fee',
                camp_cancellation_2: '14–1 days before arrival',
                camp_cancellation_2_fee: '80% cancellation fee',
                camp_cancellation_3: 'No show or early departure',
                camp_cancellation_3_fee: '100% cancellation fee',
                camp_cta_title: 'Join Us Now!',
                camp_cta_subtitle: 'Secure your spot at the Vision & Passion Tennis Camp and experience unforgettable days full of sport, sun and community.',
                camp_cta_register: 'Register for Camp Now',
                camp_cta_info: 'More Info About the Facility',
                camp_gallery_title: 'Camp Impressions',
                camp_gallery_subtitle: 'Insights into the Vision & Passion Tennis Camp',

                // Hero Section
                hero_title: 'Tennis School Batiste Guerra',
                hero_subtitle: 'More than just tennis',
                hero_cta: 'About Me',

                // About Section
                about_title: 'About Me',
                about_subtitle: 'Excellence in Tennis Education',
                about_heading: 'My Philosophy',
                about_text1: 'At Tennis School Batiste Guerra, tennis is more than just a sport—it\'s a passion I want to share with you.',
                about_text2: 'I firmly believe that everyone has the potential to flourish on the tennis court, whether you are just picking up a racket for the first time or have been playing for a long time.',
                stat_students: 'Students Trained',
                stat_years: 'Years Experience',
                stat_courts: 'Tennis Courts',
                best_ranking: 'Best Ranking',

                // Our Mission Section
                our_mission_title: 'My Mission',
                our_mission_subtitle: 'The Journey of Passion and Excellence',
                our_mission_text1: 'My mission is to meet you exactly where you are. That\'s why I place great value on individual training and personalized support.',
                our_mission_text2: 'Your progress is what drives me, and your successes, no matter how small, are my greatest motivation.',
                our_mission_text3: 'With positive energy, expertise, and patience, I help you refine your technique, sharpen your tactics, and focus on the joy of the game.',
                our_mission_text4: 'Come and become part of my tennis school. I look forward to supporting your journey and igniting your passion for this great sport!',
                
                // Mission Points
                mission_point_meet: 'I meet you where you are',
                mission_point_training: 'Individual training',
                mission_point_progress: 'Your progress drives me',
                mission_point_success: 'Every success counts',
                mission_point_family: 'Become part of my tennis school',
                
                // All Ages Section
                all_ages_title: 'Tennis Lessons',
                all_ages_subtitle: 'Tennis lessons for juniors and adults. Whether you\'re picking up a racket for the first time or perfecting your serve — I offer programs tailored to your skill level.',
                juniors_title: 'Juniors',
                juniors_age: 'Ages 5-17',
                juniors_description: 'My youth programs cater to every player — from beginners discovering the game to aspiring competitors preparing for tournaments. With a balance of fun lessons, skill development, match play, and advanced training, I make tennis enjoyable for all, whether your goal is recreation, fitness, or competition.',
                adults_title: 'Adults',
                adults_age: 'Ages 18+',
                adults_description: 'My adult programs are designed for all levels — whether you\'re picking up a racquet for the first time, looking for a fun way to stay active, or aiming to sharpen your competitive edge. With flexible evening and weekend options, sessions focus on fitness, skill building, social play, and advanced training — the perfect fit for your goals.',
                lesson_duration: '55 minutes per session',
                private_lessons: 'Private Lessons',
                private_type: 'Private',
                semi_private_type: 'Semi-private',
                group_lessons: 'Group Lessons',
                per_person: '(per person)',
                three_persons: '3 People',
                four_persons: '4 People',
                five_persons: '5 People',
                pricing_note: 'Note:',
                non_member_fee: 'Extra CHF 15 per lesson for non‑members (shared by all non‑members) — only when playing at TC Basel West (outdoor).',
                view_more: 'View more',
                contact_us_button: 'Contact Me',
                
                // Coach Section
                coach_name: 'Batiste Guerra',
                coach_role: 'Head Coach & Founder',
                coach_experience: 'Competition Trainer C • ITF Tour Player',
                coach_years: '10 Years Experience',
                coach_bio: 'As an ITF player, I defeated 3 players from the ATP Top 1000 and one from the ATP Top 700. With over 10 years of coaching experience, I develop players of all levels, from beginners to competitive athletes. Tennis is my great passion and I hope to ignite that fire in you.',
                coach_license: 'Competition Coach C',
                specialty_competition: 'Competition Training',
                specialty_mental: 'Mental Strategy',
                specialty_match: 'Match Preparation',
                specialty_sparring_r3: 'Sparring from R3',
                specialty_ic_team_prep: 'IC preparation for teams',
                specialty_tournament_support: 'Tournament support',
                coached_students: 'Students Coached',
                years_experience: 'Years Experience',
                credentials_title: 'Tennis Training Achievements',
                credential_1: 'Certified Competition Trainer C Swiss Tennis',
                credential_2: 'Best Swiss Ranking N3(45)',
                credential_3: 'Best International Ranking 400 ITF',
                credential_4: 'Still active on the international ITF Tour worldwide',
                credential_5: 'Swiss National Team B',
                credential_6: 'Badenliga Germany',
                credential_7: 'Swiss Prize Money Tournament',
                credential_8: '3 Years as Tennis Professional',
                book_session: 'Book a Session with Batiste',
                
                // Contact Section
                contact_info_title: 'Contact Information',
                contact_info_subtitle: 'Get in touch with me for tennis lessons and training',
                contact_address: 'TC Basel West, Buschweilerweg 29<br>4055 Basel, Switzerland',
                contact_phone: '+41 76 212 02 97',
                contact_email: 'batiste.guerra0@sunrise.ch',
                find_us_title: 'Find Me',
                find_us_subtitle: 'Visit me at our tennis facility in Basel',
                
                // Footer
                footer_title: 'Tennis School Batiste Guerra',
                footer_slogan: 'More than just tennis',

                // Programs Section
                programs_title: 'My Programs',
                programs_subtitle: 'Tailored Training for Every Level',
                program_beginner_title: 'Beginner',
                program_beginner_desc: 'Perfect for those starting their tennis journey. Learn fundamentals with patient, expert guidance.',
                program_beginner_feature1: 'Basic strokes and techniques',
                program_beginner_feature2: 'Court positioning',
                program_beginner_feature3: 'Game rules and etiquette',
                program_intermediate_title: 'Intermediate',
                program_intermediate_desc: 'Enhance your skills and develop strategic thinking for competitive play.',
                program_intermediate_feature1: 'Advanced stroke refinement',
                program_intermediate_feature2: 'Match tactics',
                program_intermediate_feature3: 'Physical conditioning',
                program_advanced_title: 'Advanced',
                program_advanced_desc: 'Elite training for tournament preparation and professional development.',
                program_advanced_feature1: 'Tournament preparation',
                program_advanced_feature2: 'Mental coaching',
                program_advanced_feature3: 'Performance analysis',
                program_kids_title: 'Kids',
                program_kids_desc: 'Fun and engaging tennis programs designed specifically for young players.',
                program_kids_feature1: 'Age-appropriate equipment',
                program_kids_feature2: 'Fun learning games',
                program_kids_feature3: 'Character development',
                learn_more: 'Learn More',

                // Coaches Section
                coaches_title: 'Head Coach',
                coaches_subtitle: 'Personal guidance from the head coach',
                coach1_role: 'Head Coach & Founder',
                coach1_bio: 'Former professional player with 15+ years of coaching experience. Specializes in developing champions through technical precision and mental fortitude.',
                coach2_role: 'Senior Coach',
                coach2_bio: 'Expert in youth development and beginner programs. Known for her patient approach and ability to make tennis fun and accessible for all ages.',
                coach3_role: 'Performance Coach',
                coach3_bio: 'Focuses on advanced players and tournament preparation. Former Davis Cup team member with extensive competitive experience.',

                // Gallery Section
                gallery_title: 'Gallery',
                gallery_subtitle: 'Capturing Moments of Excellence',

                // Contact Section
                contact_title: 'Contact Me',
                contact_subtitle: 'Get in touch with me',
                form_name: 'Name',
                form_email: 'Email',
                form_phone: 'Phone',
                form_message: 'Message',
                form_submit: 'Send Message',
                form_sending: 'Sending...',
                form_success: 'Thank you for your message! We\'ll get back to you soon.',
                form_error: 'Please correct the errors above.',
                form_required: 'This field is required.',
                form_email_invalid: 'Please enter a valid email address.',
                form_phone_invalid: 'Please enter a valid phone number.',
                contact_address_title: 'Address',
                contact_phone_title: 'Phone',
                contact_email_title: 'Email',
                contact_hours_title: 'Hours',
                contact_hours_text: 'Mon-Fri: 6:00-22:00<br>Sat-Sun: 8:00-20:00',

                // Footer
                footer_description: 'Swiss precision meets German discipline in professional tennis coaching.',
                footer_links_title: 'Quick Links',
                footer_programs_title: 'Programs',
                footer_rights: 'All rights reserved.',
                
                // Menu
                menu: 'Menu',
                
                // Language labels
                lang_en: 'EN',
                lang_de: 'DE',
                
                // Alt text and labels
                tennis_ball_menu_alt: 'Tennis Ball Menu',
                logo_alt: 'BG Tennisschule Logo',
                back_to_top_label: 'Back to top',
                back_to_top_title: 'Back to top'
            }
        };

        /**
         * Application initialization with comprehensive error handling
         */
        initialize() {
            try {
                this.cacheElements();
                this.initializeLanguageSystem();
                this.initializeScrollAnimations();
                this.initializeFormValidation();
                this.bindEventListeners();
                this.setupIntersectionObserver();
                this.setupResizeObserver();
                this.initializeAccessibility();
                this.initializeHeaderSlideBehavior();
                this.initializeBackToTopButton();
                this.initializeGalleryModal();
                
                // Set initial state
                this.updateLanguageInterface();
                this.updateLanguageSwitch();
                this.updatePageContent();
                
                console.log('BG Tennisschule application successfully initialized');
            } catch (error) {
                console.error('Application initialization failed:', error);
                this.handleApplicationError(error);
            }
        }

        /**
         * Cache DOM elements for performance optimization
         */
        cacheElements() {
            this.elements = {
                header: document.getElementById('header'),
                hamburger: document.getElementById('hamburger'),
                menuClose: document.getElementById('menuClose'),
                offCanvasMenu: document.getElementById('offCanvasMenu'),
                contactForm: document.getElementById('contactForm'),
                langButtons: document.querySelectorAll('.lang-btn'),
                navLinks: document.querySelectorAll('a[href^="#"]'),
                fadeElements: document.querySelectorAll('.fade-in'),
                backToTopButton: document.getElementById('backToTop'),
                galleryItems: document.querySelectorAll('.gallery-item'),
                galleryModal: document.getElementById('galleryModal'),
                galleryModalImage: document.getElementById('galleryModalImage'),
                galleryModalClose: document.getElementById('galleryModalClose'),
                galleryModalPrev: document.getElementById('galleryModalPrev'),
                galleryModalNext: document.getElementById('galleryModalNext'),
                body: document.body,
                html: document.documentElement
            };
        }

        /**
         * Retrieve stored language preference with validation
         */
        getStoredLanguage() {
            try {
                const stored = localStorage.getItem('bg-tennisschule-language');
                return this.translations[stored] ? stored : null;
            } catch (error) {
                console.warn('localStorage not available:', error);
                return null;
            }
        }

        /**
         * Initialize language system - Always defaults to German unless user explicitly changed it
         */
        initializeLanguageSystem() {
            // If no stored language preference, always default to German
            if (!this.state.currentLanguage) {
                this.state.currentLanguage = 'de-CH';
            }
            
            this.elements.html.lang = this.state.currentLanguage;
        }

        /**
         * Comprehensive event listener binding with cleanup tracking
         */
        bindEventListeners() {
            const events = [
                // Mobile menu functionality
                {
                    element: this.elements.hamburger,
                    event: 'click',
                    handler: this.toggleMobileMenu.bind(this)
                },
                {
                    element: this.elements.menuClose,
                    event: 'click',
                    handler: this.closeMobileMenu.bind(this)
                },
                
                // Scroll handling
                {
                    element: window,
                    event: 'scroll',
                    handler: this.throttle(this.handleScroll.bind(this), CONFIG.debounceDelay)
                },
                
                // Keyboard accessibility
                {
                    element: document,
                    event: 'keydown',
                    handler: this.handleKeyboardNavigation.bind(this)
                },
                
                // Window resize
                {
                    element: window,
                    event: 'resize',
                    handler: this.debounce(this.handleWindowResize.bind(this), 250)
                },
                
                // Back to top button
                {
                    element: this.elements.backToTopButton,
                    event: 'click',
                    handler: this.handleBackToTop.bind(this)
                },
                
                // Gallery modal events
                {
                    element: this.elements.galleryModalClose,
                    event: 'click',
                    handler: this.closeGalleryModal.bind(this)
                },
                {
                    element: this.elements.galleryModal,
                    event: 'click',
                    handler: this.handleGalleryModalClick.bind(this)
                },
                {
                    element: this.elements.galleryModalPrev,
                    event: 'click',
                    handler: this.showPreviousImage.bind(this)
                },
                {
                    element: this.elements.galleryModalNext,
                    event: 'click',
                    handler: this.showNextImage.bind(this)
                }
            ];

            // Language switch events
            const languageSwitch = document.getElementById('languageSwitch');
            if (languageSwitch) {
                events.push({
                    element: languageSwitch,
                    event: 'click',
                    handler: this.handleLanguageChange.bind(this)
                });
                
                // Keyboard support
                events.push({
                    element: languageSwitch,
                    event: 'keydown',
                    handler: this.handleLanguageKeydown.bind(this)
                });
                
                // Touch support for mobile
                events.push({
                    element: languageSwitch,
                    event: 'touchstart',
                    handler: this.handleTouchStart.bind(this)
                });
                
                events.push({
                    element: languageSwitch,
                    event: 'touchend',
                    handler: this.handleTouchEnd.bind(this)
                });
            }

            // Navigation link events
            this.elements.navLinks.forEach(link => {
                events.push({
                    element: link,
                    event: 'click',
                    handler: this.handleSmoothScroll.bind(this)
                });
            });

            // Prevent menu from closing when clicking on menu content
            const menuContent = document.querySelector('.menu-content');
            if (menuContent) {
                events.push({
                    element: menuContent,
                    event: 'click',
                    handler: (event) => {
                        event.stopPropagation(); // Prevent event from bubbling up to the backdrop
                    }
                });
            }

            // Bind events and track for cleanup
            events.forEach(({ element, event, handler }) => {
                if (element) {
                    element.addEventListener(event, handler, { passive: event === 'scroll' });
                    
                    // Track for potential cleanup
                    if (!this.eventListeners.has(element)) {
                        this.eventListeners.set(element, []);
                    }
                    this.eventListeners.get(element).push({ event, handler });
                }
            });
        }

        /**
         * Mobile menu toggle with accessibility compliance
         */
        toggleMobileMenu() {
            this.state.isMenuOpen = !this.state.isMenuOpen;
            this.updateMobileMenuState();
        }

        /**
         * Close mobile menu
         */
        closeMobileMenu() {
            this.state.isMenuOpen = false;
            this.updateMobileMenuState();
        }


        /**
         * Update mobile menu state with accessibility
         */
        updateMobileMenuState() {
            const { hamburger, offCanvasMenu, body } = this.elements;
            
            if (hamburger && offCanvasMenu) {
                // Update tennis ball button
                hamburger.classList.toggle('active', this.state.isMenuOpen);
                offCanvasMenu.classList.toggle('active', this.state.isMenuOpen);
                
                // Update aria attributes
                hamburger.setAttribute('aria-expanded', this.state.isMenuOpen.toString());
                
                // Add/remove menu-open class to body for CSS targeting
                body.classList.toggle('menu-open', this.state.isMenuOpen);
                
                // Prevent body scroll when menu is open
                body.style.overflow = this.state.isMenuOpen ? 'hidden' : '';
                
                // Focus management
                if (this.state.isMenuOpen) {
                    const firstMenuItem = offCanvasMenu.querySelector('a');
                    firstMenuItem?.focus();
                } else {
                    hamburger.focus();
                }
            }
        }

        /**
         * Handle keyboard navigation for accessibility
         */
        handleKeyboardNavigation(event) {
            switch (event.key) {
                case 'Escape':
                    if (this.state.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                    break;
                case 'Tab':
                    if (this.state.isMenuOpen) {
                        this.handleMenuTabNavigation(event);
                    }
                    break;
            }
        }

        /**
         * Handle tab navigation within menu
         */
        handleMenuTabNavigation(event) {
            const focusableElements = this.elements.offCanvasMenu.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        /**
         * Handle language change with persistence
         */
        handleLanguageChange(event) {
            // Toggle between languages
            const newLanguage = this.state.currentLanguage === 'de-CH' ? 'en' : 'de-CH';
            this.setLanguage(newLanguage);
            this.updateLanguageSwitch();
        }

        /**
         * Handle keyboard navigation for language switch
         */
        handleLanguageKeydown(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.handleLanguageChange(event);
            }
        }

        /**
         * Handle touch start for swipe detection
         */
        handleTouchStart(event) {
            this.touchStartX = event.changedTouches[0].screenX;
        }

        /**
         * Handle touch end for swipe detection
         */
        handleTouchEnd(event) {
            this.touchEndX = event.changedTouches[0].screenX;
            const swipeDistance = Math.abs(this.touchEndX - this.touchStartX);
            
            if (swipeDistance > 20) {
                if (this.touchEndX < this.touchStartX && this.state.currentLanguage === 'en') {
                    // Swipe left to Swiss German
                    this.setLanguage('de-CH');
                    this.updateLanguageSwitch();
                } else if (this.touchEndX > this.touchStartX && this.state.currentLanguage === 'de-CH') {
                    // Swipe right to English
                    this.setLanguage('en');
                    this.updateLanguageSwitch();
                }
            }
        }

        /**
         * Update language switch visual state
         * German (DE) is on the right and should be active by default
         */
        updateLanguageSwitch() {
            const languageSwitch = document.getElementById('languageSwitch');
            const sliderText = document.getElementById('sliderText');
            
            if (languageSwitch && sliderText) {
                if (this.state.currentLanguage === 'de-CH') {
                    // German is active - slider should be on the right
                    languageSwitch.classList.add('active');
                    languageSwitch.setAttribute('aria-checked', 'true');
                    sliderText.textContent = this.getTranslation('lang_de');
                } else {
                    // English is active - slider should be on the left
                    languageSwitch.classList.remove('active');
                    languageSwitch.setAttribute('aria-checked', 'false');
                    sliderText.textContent = this.getTranslation('lang_en');
                }

                // Add bounce animation
                languageSwitch.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    languageSwitch.style.transform = '';
                }, 150);
            }
        }

        /**
         * Set language with comprehensive updates
         */
        setLanguage(language) {
            this.state.currentLanguage = language;
            
            try {
                localStorage.setItem('bg-tennisschule-language', language);
            } catch (error) {
                console.warn('Could not save language preference:', error);
            }
            
            this.elements.html.lang = language;
            this.updateLanguageInterface();
            this.updatePageContent();
        }

        /**
         * Update language toggle interface (legacy support)
         */
        updateLanguageInterface() {
            // Legacy method - now handled by updateLanguageSwitch()
            // Keeping for backward compatibility
        }

        /**
         * Update page content with current language
         */
        updatePageContent() {
            const translations = this.translations[this.state.currentLanguage];
            
            // Update page title
            if (translations.page_title) {
                document.title = translations.page_title;
            }
            
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.dataset.key;
                if (translations[key]) {
                    // Handle different element types
                    if (element.tagName === 'IMG') {
                        element.alt = translations[key];
                    } else if (element.hasAttribute('aria-label')) {
                        element.setAttribute('aria-label', translations[key]);
                    } else if (element.hasAttribute('title')) {
                        element.setAttribute('title', translations[key]);
                    } else {
                        // Handle HTML content vs text content
                        if (translations[key].includes('<br>')) {
                            element.innerHTML = translations[key];
                        } else {
                            element.textContent = translations[key];
                        }
                    }
                }
            });
        }

        /**
         * Handle smooth scrolling with header offset
         */
        handleSmoothScroll(event) {
            const href = event.currentTarget.getAttribute('href');
            
            if (href?.startsWith('#')) {
                event.preventDefault();
                this.scrollToSection(href.slice(1));
                // Close menu after navigation
                if (this.state.isMenuOpen) {
                    this.closeMobileMenu();
                }
            }
        }

        /**
         * Scroll to section with calculated offset
         */
        scrollToSection(sectionId) {
            const target = document.getElementById(sectionId);
            if (target) {
                const headerHeight = this.elements.header?.offsetHeight || CONFIG.scrollOffset;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        }

        /**
         * Initialize header slide behavior
         */
        initializeHeaderSlideBehavior() {
            // Get hero section height for threshold calculation
            const heroSection = document.getElementById('home');
            if (heroSection) {
                this.state.heroHeight = heroSection.offsetHeight;
            }
        }

        /**
         * Handle scroll events with performance optimization
         */
        handleScroll() {
            if (this.state.isScrolling) return;
            
            this.state.isScrolling = true;
            
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDirection = this.getScrollDirection(scrollTop);
                
                // Update header state
                if (this.elements.header) {
                    this.elements.header.classList.toggle('scrolled', scrollTop > 50);
                    
                    // Handle header slide behavior
                    this.handleHeaderSlide(scrollTop, scrollDirection);
                }
                
                // Update back to top button visibility
                this.updateBackToTopButton(scrollTop);
                
                this.state.lastScrollTop = scrollTop;
                this.state.isScrolling = false;
            });
        }

        /**
         * Get scroll direction
         */
        getScrollDirection(currentScrollTop) {
            const lastScrollTop = this.state.lastScrollTop;
            return currentScrollTop > lastScrollTop ? 'down' : 'up';
        }

        /**
         * Handle header slide behavior
         */
        handleHeaderSlide(scrollTop, scrollDirection) {
            const header = this.elements.header;
            const threshold = 50; // Minimum scroll distance before hiding header
            
            // Start hiding header immediately when scrolling begins
            if (scrollTop > threshold) {
                if (scrollDirection === 'down' && !this.state.isHeaderHidden) {
                    // Scrolling down - hide header
                    header.classList.add('hidden');
                    this.state.isHeaderHidden = true;
                } else if (scrollDirection === 'up' && this.state.isHeaderHidden) {
                    // Scrolling up - show header
                    header.classList.remove('hidden');
                    this.state.isHeaderHidden = false;
                }
            } else {
                // Always show header when at the top
                if (this.state.isHeaderHidden) {
                    header.classList.remove('hidden');
                    this.state.isHeaderHidden = false;
                }
            }
        }

        /**
         * Handle window resize events
         */
        handleWindowResize() {
            // Close menu on desktop resize
            if (window.innerWidth > CONFIG.breakpoints.mobile && this.state.isMenuOpen) {
                this.closeMobileMenu();
            }
            
            // Recalculate hero height on resize
            this.initializeHeaderSlideBehavior();
        }

        /**
         * Initialize intersection observer for scroll animations
         */
        setupIntersectionObserver() {
            const options = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            this.state.intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.state.intersectionObserver.unobserve(entry.target);
                    }
                });
            }, options);

            this.elements.fadeElements.forEach(el => {
                this.state.intersectionObserver.observe(el);
            });
        }

        /**
         * Initialize scroll animations
         */
        initializeScrollAnimations() {
            // Enable smooth scrolling if supported
            if ('scrollBehavior' in this.elements.html.style) {
                this.elements.html.style.scrollBehavior = 'smooth';
            }
        }

        /**
         * Setup resize observer for responsive adjustments
         */
        setupResizeObserver() {
            if ('ResizeObserver' in window) {
                this.state.resizeObserver = new ResizeObserver(entries => {
                    // Handle resize events if needed
                    this.handleResponsiveAdjustments();
                });
                
                this.state.resizeObserver.observe(this.elements.body);
            }
        }

        /**
         * Handle responsive adjustments
         */
        handleResponsiveAdjustments() {
            // Placeholder for responsive logic
        }

        /**
         * Initialize accessibility features
         */
        initializeAccessibility() {
            // Enhance form accessibility
            this.enhanceFormAccessibility();
            
            // Initialize mission section interactions
            this.initializeMissionInteractions();
            
            // Initialize all ages section interactions
            this.initializeAllAgesInteractions();
            
            // Initialize coach section interactions
            this.initializeCoachInteractions();
            this.initializeNewsDetailInteractions();
            
        }

        /**
         * Neutralize unintended click effects on news detail tables
         */
        initializeNewsDetailInteractions() {
            const newsTables = document.querySelectorAll('.news-table');
            if (newsTables.length === 0) return;

            newsTables.forEach((table) => {
                // Prevent click/tap from bubbling and triggering any global handlers
                table.addEventListener('click', (e) => {
                    e.stopPropagation();
                }, { passive: true });
                table.addEventListener('touchstart', (e) => {
                    e.stopPropagation();
                }, { passive: true });
            });
        }

        /**
         * Initialize mission section interactive elements
         */
        initializeMissionInteractions() {
            // Mission point interactions
            const missionPoints = document.querySelectorAll('.mission-point');
            
            missionPoints.forEach((point) => {
                point.addEventListener('mouseenter', () => {
                    point.style.transform = 'translateY(-3px)';
                });
                
                point.addEventListener('mouseleave', () => {
                    point.style.transform = 'translateY(0)';
                });
            });

            // Add scroll animation for points
            this.setupMissionPointsAnimation();
        }

        /**
         * Setup mission points scroll animation
         */
        setupMissionPointsAnimation() {
            const missionSection = document.querySelector('.our-mission');
            if (!missionSection) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const points = entry.target.querySelectorAll('.mission-point');
                        points.forEach((point, index) => {
                            setTimeout(() => {
                                point.style.opacity = '1';
                                point.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(missionSection);
        }

        /**
         * Initialize all ages section interactions
         */
        initializeAllAgesInteractions() {
            const cards = document.querySelectorAll('.age-card');
            
            // Remove click interactions to prevent flashing
            // Keep only visual hover effects and animations
            cards.forEach((card, index) => {
                // Enhanced hover effects (no click behavior)
                card.addEventListener('mouseenter', function() {
                    // Subtle hover effect without animations that could cause flashing
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                });

                // Intersection Observer for scroll animations
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.animationDelay = `${index * 0.1}s`;
                            entry.target.classList.add('animate-in');
                        }
                    });
                }, {
                    threshold: 0.1
                });

                observer.observe(card);
            });

            // Dynamic stats animation
            this.animateStats();
        }

        /**
         * Animate stats numbers
         */
        animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const text = entry.target.textContent;
                            if (text.includes('min')) {
                                this.animateNumber(entry.target, parseInt(text), 'min');
                            } else if (text.includes(':')) {
                                // Handle ratios differently
                                entry.target.style.color = 'var(--accent-color)';
                            } else if (text.includes('x')) {
                                this.animateNumber(entry.target, parseInt(text), 'x');
                            }
                        }
                    });
                });
                observer.observe(stat);
            });
        }

        /**
         * Animate number counting
         */
        animateNumber(element, target, suffix) {
            let current = 0;
            const increment = target / 20;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + suffix;
            }, 50);
        }

        /**
         * Initialize coach section interactions and animations
         */
        initializeCoachInteractions() {
            // Animated Counter for Stats
            this.animateCoachCounters();
            
            // Specialty tags hover effect
            this.initSpecialtyTags();
            
            
            // Image lazy loading with animation
            this.initImageAnimation();
            
            // Enhanced hover effects for stats
            this.initStatsInteraction();
            
            // Credential animation
            this.initCredentialAnimation();
        }

        /**
         * Animated Counter for Coach Stats
         */
        animateCoachCounters() {
            const counters = document.querySelectorAll('.stat-number[data-target]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.getAttribute('data-target'));
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;
                        
                        // Check if this is the students coached counter (has + in original text)
                        const originalText = counter.textContent;
                        const hasPlus = originalText.includes('+');
                        
                        const updateCounter = () => {
                            if (current < target) {
                                current += step;
                                if (hasPlus) {
                                    counter.textContent = '+' + Math.floor(current);
                                } else {
                                    counter.textContent = Math.floor(current);
                                }
                                requestAnimationFrame(updateCounter);
                            } else {
                                if (hasPlus) {
                                    counter.textContent = '+' + target;
                                } else {
                                    counter.textContent = target;
                                }
                            }
                        };
                        
                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => observer.observe(counter));
        }

        /**
         * Specialty tags hover effect
         */
        initSpecialtyTags() {
            const tags = document.querySelectorAll('.specialty-tag');
            
            tags.forEach(tag => {
                tag.addEventListener('mouseenter', function() {
                    this.style.animation = 'pulse 0.6s ease-in-out';
                });
                
                tag.addEventListener('mouseleave', function() {
                    this.style.animation = '';
                });
            });
        }


        /**
         * Image lazy loading with animation
         */
        initImageAnimation() {
            const coachImage = document.querySelector('.coach-image');
            
            if (!coachImage) return;
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1) rotate(0deg)';
                    }
                });
            });
            
            imageObserver.observe(coachImage);
        }

        /**
         * Enhanced hover effects for stats
         */
        initStatsInteraction() {
            const statItems = document.querySelectorAll('.stat-item');
            
            statItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.05)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        /**
         * Credential animation
         */
        initCredentialAnimation() {
            const credentials = document.querySelectorAll('.credential');
            
            if (credentials.length === 0) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const credentialElements = entry.target.querySelectorAll('.credential');
                        credentialElements.forEach((credential, index) => {
                            credential.style.opacity = '0';
                            credential.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                credential.style.transition = 'all 0.5s ease';
                                credential.style.opacity = '1';
                                credential.style.transform = 'translateY(0)';
                            }, index * 100 + 500);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            const credentialsSection = document.querySelector('.credentials-section');
            if (credentialsSection) {
                observer.observe(credentialsSection);
            }
        }


        /**
         * Enhance form accessibility
         */
        enhanceFormAccessibility() {
            const form = this.elements.contactForm;
            if (form) {
                // Add aria-live region for form messages
                const messageRegion = document.createElement('div');
                messageRegion.setAttribute('aria-live', 'polite');
                messageRegion.setAttribute('aria-atomic', 'true');
                messageRegion.className = 'form-message-region';
                messageRegion.style.position = 'absolute';
                messageRegion.style.left = '-10000px';
                messageRegion.style.width = '1px';
                messageRegion.style.height = '1px';
                messageRegion.style.overflow = 'hidden';
                
                form.parentNode.insertBefore(messageRegion, form);
            }
        }

        /**
         * Comprehensive form validation system
         */
        initializeFormValidation() {
            const form = this.elements.contactForm;
            if (!form) return;

            form.addEventListener('submit', this.handleFormSubmission.bind(this));
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateField.bind(this));
                input.addEventListener('input', this.clearFieldError.bind(this));
            });
        }

        /**
         * Handle form submission with comprehensive validation
         */
        handleFormSubmission(event) {
            event.preventDefault();
            
            if (this.state.formSubmitting) return;
            
            const form = event.target;
            const formData = new FormData(form);
            let isValid = true;

            // Validate all required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!this.validateField({ target: field })) {
                    isValid = false;
                }
            });

            if (isValid) {
                this.submitForm(formData, form);
            } else {
                this.showFormMessage(this.getTranslation('form_error'), 'error');
                // Focus first invalid field
                const firstError = form.querySelector('.error');
                firstError?.focus();
            }
        }

        /**
         * Validate individual form field with comprehensive rules
         */
        validateField(event) {
            const field = event.target;
            const value = field.value.trim();
            let isValid = true;
            let message = '';

            // Clear existing errors
            this.clearFieldError({ target: field });

            // Required field validation
            if (field.hasAttribute('required') && !value) {
                message = this.getTranslation('form_required');
                isValid = false;
            }
            // Email validation
            else if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    message = this.getTranslation('form_email_invalid');
                    isValid = false;
                }
            }
            // Phone validation
            else if (field.type === 'tel' && value) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    message = this.getTranslation('form_phone_invalid');
                    isValid = false;
                }
            }

            if (!isValid) {
                this.showFieldError(field, message);
            }

            return isValid;
        }

        /**
         * Show field-specific error message
         */
        showFieldError(field, message) {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
            
            const errorId = `error-${field.name || field.id}`;
            let errorElement = field.parentNode.querySelector(`#${errorId}`);
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.id = errorId;
                errorElement.className = 'field-error';
                errorElement.setAttribute('role', 'alert');
                field.parentNode.appendChild(errorElement);
                field.setAttribute('aria-describedby', errorId);
            }
            
            errorElement.textContent = message;
        }

        /**
         * Clear field error
         */
        clearFieldError(event) {
            const field = event.target;
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
            
            const errorId = `error-${field.name || field.id}`;
            const errorElement = field.parentNode.querySelector(`#${errorId}`);
            if (errorElement) {
                errorElement.remove();
                field.removeAttribute('aria-describedby');
            }
        }

        /**
         * Submit form with loading state and error handling
         */
        async submitForm(formData, form) {
            const submitButton = form.querySelector('[type="submit"]');
            const originalText = submitButton.textContent;
            
            this.state.formSubmitting = true;
            submitButton.textContent = this.getTranslation('form_sending');
            submitButton.disabled = true;

            try {
                // Simulate API call (replace with actual endpoint)
                await this.simulateFormSubmission(formData);
                
                form.reset();
                this.showFormMessage(this.getTranslation('form_success'), 'success');
                
                // Announce success to screen readers
                this.announceToScreenReader(this.getTranslation('form_success'));
                
            } catch (error) {
                console.error('Form submission failed:', error);
                this.showFormMessage('An error occurred. Please try again.', 'error');
            } finally {
                this.state.formSubmitting = false;
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        }

        /**
         * Simulate form submission (replace with actual API call)
         */
        simulateFormSubmission(formData) {
            return new Promise((resolve) => {
                setTimeout(resolve, CONFIG.formSubmissionDelay);
            });
        }

        /**
         * Show form status message with accessibility
         */
        showFormMessage(message, type = 'info') {
            // Remove existing message
            const existingMessage = document.querySelector('.form-message');
            existingMessage?.remove();

            const messageElement = document.createElement('div');
            messageElement.className = `form-message form-message--${type}`;
            messageElement.textContent = message;
            messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');

            const form = this.elements.contactForm;
            form.parentNode.insertBefore(messageElement, form);

            // Auto-hide success messages
            if (type === 'success') {
                setTimeout(() => {
                    messageElement.remove();
                }, CONFIG.messageDisplayDuration);
            }
        }

        /**
         * Announce message to screen readers
         */
        announceToScreenReader(message) {
            const announcer = document.querySelector('.form-message-region');
            if (announcer) {
                announcer.textContent = message;
                setTimeout(() => {
                    announcer.textContent = '';
                }, 1000);
            }
        }

        /**
         * Get translation with fallback
         */
        getTranslation(key) {
            return this.translations[this.state.currentLanguage]?.[key] || key;
        }

        /**
         * Handle application errors gracefully
         */
        handleApplicationError(error) {
            console.error('Application error:', error);
            
            // Basic fallback functionality
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = e.currentTarget.getAttribute('href');
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }

        /**
         * Initialize back to top button functionality
         */
        initializeBackToTopButton() {
            if (!this.elements.backToTopButton) return;
            
            // Set initial state
            this.updateBackToTopButton(window.pageYOffset || document.documentElement.scrollTop);
        }

        /**
         * Update back to top button visibility based on scroll position
         */
        updateBackToTopButton(scrollTop) {
            if (!this.elements.backToTopButton) return;
            
            const showThreshold = 300; // Show button after scrolling 300px
            const isVisible = scrollTop > showThreshold;
            
            if (isVisible && !this.elements.backToTopButton.classList.contains('visible')) {
                this.elements.backToTopButton.classList.add('visible');
                // Add bounce animation on first show
                this.elements.backToTopButton.classList.add('show');
                setTimeout(() => {
                    this.elements.backToTopButton.classList.remove('show');
                }, 600);
            } else if (!isVisible && this.elements.backToTopButton.classList.contains('visible')) {
                this.elements.backToTopButton.classList.remove('visible');
            }
        }

        /**
         * Handle back to top button click
         */
        handleBackToTop(event) {
            event.preventDefault();
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add click animation
            this.elements.backToTopButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.elements.backToTopButton.style.transform = '';
            }, 150);
        }

        /**
         * Initialize gallery modal functionality
         */
        initializeGalleryModal() {
            if (!this.elements.galleryModal) return;
            
            // Collect all gallery images
            this.state.galleryImages = Array.from(this.elements.galleryItems).map(item => {
                const img = item.querySelector('img');
                return {
                    src: img.src,
                    alt: img.alt
                };
            });
            
            // Add click listeners to gallery items
            this.elements.galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    this.openGalleryModal(index);
                });
            });
            
            // Add keyboard navigation
            document.addEventListener('keydown', this.handleGalleryKeyboard.bind(this));
        }

        /**
         * Open gallery modal with specific image
         */
        openGalleryModal(imageIndex) {
            if (!this.elements.galleryModal || !this.elements.galleryModalImage) return;
            
            this.state.currentImageIndex = imageIndex;
            this.state.isGalleryModalOpen = true;
            
            const image = this.state.galleryImages[imageIndex];
            this.elements.galleryModalImage.src = image.src;
            this.elements.galleryModalImage.alt = image.alt;
            
            this.elements.galleryModal.classList.add('active');
            this.elements.body.style.overflow = 'hidden';
            
            // Update navigation buttons visibility
            this.updateGalleryNavigation();
        }

        /**
         * Close gallery modal
         */
        closeGalleryModal() {
            if (!this.elements.galleryModal) return;
            
            this.state.isGalleryModalOpen = false;
            this.elements.galleryModal.classList.remove('active');
            this.elements.body.style.overflow = '';
        }

        /**
         * Handle gallery modal click (close when clicking outside image)
         */
        handleGalleryModalClick(event) {
            if (event.target === this.elements.galleryModal) {
                this.closeGalleryModal();
            }
        }

        /**
         * Show previous image in gallery
         */
        showPreviousImage() {
            if (this.state.galleryImages.length === 0) return;
            
            this.state.currentImageIndex = (this.state.currentImageIndex - 1 + this.state.galleryImages.length) % this.state.galleryImages.length;
            this.updateGalleryImage();
            this.updateGalleryNavigation();
        }

        /**
         * Show next image in gallery
         */
        showNextImage() {
            if (this.state.galleryImages.length === 0) return;
            
            this.state.currentImageIndex = (this.state.currentImageIndex + 1) % this.state.galleryImages.length;
            this.updateGalleryImage();
            this.updateGalleryNavigation();
        }

        /**
         * Update gallery image display
         */
        updateGalleryImage() {
            if (!this.elements.galleryModalImage) return;
            
            const image = this.state.galleryImages[this.state.currentImageIndex];
            this.elements.galleryModalImage.src = image.src;
            this.elements.galleryModalImage.alt = image.alt;
        }

        /**
         * Update gallery navigation buttons
         */
        updateGalleryNavigation() {
            if (!this.elements.galleryModalPrev || !this.elements.galleryModalNext) return;
            
            const totalImages = this.state.galleryImages.length;
            
            // Show/hide navigation buttons based on image count
            if (totalImages <= 1) {
                this.elements.galleryModalPrev.style.display = 'none';
                this.elements.galleryModalNext.style.display = 'none';
            } else {
                this.elements.galleryModalPrev.style.display = 'flex';
                this.elements.galleryModalNext.style.display = 'flex';
            }
        }

        /**
         * Handle keyboard navigation for gallery
         */
        handleGalleryKeyboard(event) {
            if (!this.state.isGalleryModalOpen) return;
            
            switch (event.key) {
                case 'Escape':
                    this.closeGalleryModal();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    this.showPreviousImage();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.showNextImage();
                    break;
            }
        }

        /**
         * Performance optimization utilities
         */
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }

        debounce(func, delay) {
            let timeoutId;
            return function(...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        }

        /**
         * Cleanup method for proper memory management
         */
        destroy() {
            // Remove event listeners
            this.eventListeners.forEach((listeners, element) => {
                listeners.forEach(({ event, handler }) => {
                    element.removeEventListener(event, handler);
                });
            });

            // Disconnect observers
            this.state.intersectionObserver?.disconnect();
            this.state.resizeObserver?.disconnect();

            // Clear references
            this.elements = {};
            this.eventListeners.clear();
            
            BGTennisschuleApp.instance = null;
        }
    }

    /**
     * Global function for backward compatibility
     */
    window.scrollToSection = function(sectionId) {
        const app = BGTennisschuleApp.instance;
        if (app) {
            app.scrollToSection(sectionId);
        }
    };

    /**
     * Initialize application when DOM is ready
     */
    function initializeApplication() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.bgTennisschule = new BGTennisschuleApp();
            });
        } else {
            window.bgTennisschule = new BGTennisschuleApp();
        }
    }

    // Initialize the application
    initializeApplication();

    // Export for module systems if needed
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = BGTennisschuleApp;
    }

})();