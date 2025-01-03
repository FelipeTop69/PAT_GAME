--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: avatares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.avatares (
    avatarid integer NOT NULL,
    imagenurl character varying(200) NOT NULL,
    descripcion character varying(20) NOT NULL
);


ALTER TABLE public.avatares OWNER TO postgres;

--
-- Name: avatares_avatarid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.avatares_avatarid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.avatares_avatarid_seq OWNER TO postgres;

--
-- Name: avatares_avatarid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.avatares_avatarid_seq OWNED BY public.avatares.avatarid;


--
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    idcategoria integer NOT NULL,
    nombre character varying(30) NOT NULL,
    activo integer NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- Name: categoria_idcategoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_idcategoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_idcategoria_seq OWNER TO postgres;

--
-- Name: categoria_idcategoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_idcategoria_seq OWNED BY public.categoria.idcategoria;


--
-- Name: configuracion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.configuracion (
    id_configuracion integer NOT NULL,
    memorizarfacil integer NOT NULL,
    ordenarfacil integer NOT NULL,
    memorizarmedio integer NOT NULL,
    ordenarmedio integer NOT NULL,
    memorizardificil integer NOT NULL,
    ordenardificil integer NOT NULL,
    idcategoria integer NOT NULL,
    estado_partida boolean DEFAULT false
);


ALTER TABLE public.configuracion OWNER TO postgres;

--
-- Name: configuracion_id_configuracion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.configuracion_id_configuracion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.configuracion_id_configuracion_seq OWNER TO postgres;

--
-- Name: configuracion_id_configuracion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.configuracion_id_configuracion_seq OWNED BY public.configuracion.id_configuracion;


--
-- Name: jugador_partida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jugador_partida (
    jugadorpartidaid integer NOT NULL,
    puntuacion integer NOT NULL,
    jugadorid integer,
    ronda integer,
    nivel character varying(10)
);


ALTER TABLE public.jugador_partida OWNER TO postgres;

--
-- Name: jugador_partida_jugadorpartidaid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jugador_partida_jugadorpartidaid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jugador_partida_jugadorpartidaid_seq OWNER TO postgres;

--
-- Name: jugador_partida_jugadorpartidaid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jugador_partida_jugadorpartidaid_seq OWNED BY public.jugador_partida.jugadorpartidaid;


--
-- Name: puntos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puntos (
    id_puntos integer NOT NULL,
    puntos_obtenidos integer
);


ALTER TABLE public.puntos OWNER TO postgres;

--
-- Name: puntos_id_puntos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.puntos_id_puntos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.puntos_id_puntos_seq OWNER TO postgres;

--
-- Name: puntos_id_puntos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.puntos_id_puntos_seq OWNED BY public.puntos.id_puntos;


--
-- Name: registro_jugador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registro_jugador (
    jugadorid integer NOT NULL,
    numerodocumento character varying(12) NOT NULL,
    nombre character varying(50) NOT NULL,
    avatarid integer
);


ALTER TABLE public.registro_jugador OWNER TO postgres;

--
-- Name: registro_jugador_jugadorid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registro_jugador_jugadorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.registro_jugador_jugadorid_seq OWNER TO postgres;

--
-- Name: registro_jugador_jugadorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registro_jugador_jugadorid_seq OWNED BY public.registro_jugador.jugadorid;


--
-- Name: avatares avatarid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avatares ALTER COLUMN avatarid SET DEFAULT nextval('public.avatares_avatarid_seq'::regclass);


--
-- Name: categoria idcategoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN idcategoria SET DEFAULT nextval('public.categoria_idcategoria_seq'::regclass);


--
-- Name: configuracion id_configuracion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion ALTER COLUMN id_configuracion SET DEFAULT nextval('public.configuracion_id_configuracion_seq'::regclass);


--
-- Name: jugador_partida jugadorpartidaid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugador_partida ALTER COLUMN jugadorpartidaid SET DEFAULT nextval('public.jugador_partida_jugadorpartidaid_seq'::regclass);


--
-- Name: puntos id_puntos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puntos ALTER COLUMN id_puntos SET DEFAULT nextval('public.puntos_id_puntos_seq'::regclass);


--
-- Name: registro_jugador jugadorid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_jugador ALTER COLUMN jugadorid SET DEFAULT nextval('public.registro_jugador_jugadorid_seq'::regclass);


--
-- Data for Name: avatares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.avatares (avatarid, imagenurl, descripcion) FROM stdin;
1	../assets/img/Avatares/Avatar_01.png	Avatar01
2	../assets/img/Avatares/Avatar_02.png	Avatar02
3	../assets/img/Avatares/Avatar_03.png	Avatar03
4	../assets/img/Avatares/Avatar_04.png	Avatar04
5	../assets/img/Avatares/Avatar_05.png	Avatar05
6	../assets/img/Avatares/Avatar_06.png	Avatar06
7	../assets/img/Avatares/Avatar_07.png	Avatar07
8	../assets/img/Avatares/Avatar_08.png	Avatar08
\.


--
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (idcategoria, nombre, activo) FROM stdin;
2	Frutas	1
1	Números	1
3	Cómputo	1
\.


--
-- Data for Name: configuracion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.configuracion (id_configuracion, memorizarfacil, ordenarfacil, memorizarmedio, ordenarmedio, memorizardificil, ordenardificil, idcategoria, estado_partida) FROM stdin;
\.


--
-- Data for Name: jugador_partida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jugador_partida (jugadorpartidaid, puntuacion, jugadorid, ronda, nivel) FROM stdin;
\.


--
-- Data for Name: puntos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.puntos (id_puntos, puntos_obtenidos) FROM stdin;
1	\N
\.


--
-- Data for Name: registro_jugador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registro_jugador (jugadorid, numerodocumento, nombre, avatarid) FROM stdin;
\.


--
-- Name: avatares_avatarid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.avatares_avatarid_seq', 8, true);


--
-- Name: categoria_idcategoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_idcategoria_seq', 3, true);


--
-- Name: configuracion_id_configuracion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.configuracion_id_configuracion_seq', 1, false);


--
-- Name: jugador_partida_jugadorpartidaid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jugador_partida_jugadorpartidaid_seq', 1, false);


--
-- Name: puntos_id_puntos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.puntos_id_puntos_seq', 1, true);


--
-- Name: registro_jugador_jugadorid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registro_jugador_jugadorid_seq', 1, false);


--
-- Name: avatares avatares_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avatares
    ADD CONSTRAINT avatares_pkey PRIMARY KEY (avatarid);


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (idcategoria);


--
-- Name: configuracion configuracion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion
    ADD CONSTRAINT configuracion_pkey PRIMARY KEY (id_configuracion);


--
-- Name: jugador_partida jugador_partida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugador_partida
    ADD CONSTRAINT jugador_partida_pkey PRIMARY KEY (jugadorpartidaid);


--
-- Name: puntos puntos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puntos
    ADD CONSTRAINT puntos_pkey PRIMARY KEY (id_puntos);


--
-- Name: registro_jugador registro_jugador_numerodocumento_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_jugador
    ADD CONSTRAINT registro_jugador_numerodocumento_key UNIQUE (numerodocumento);


--
-- Name: registro_jugador registro_jugador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_jugador
    ADD CONSTRAINT registro_jugador_pkey PRIMARY KEY (jugadorid);


--
-- Name: registro_jugador fk_avatarid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_jugador
    ADD CONSTRAINT fk_avatarid FOREIGN KEY (avatarid) REFERENCES public.avatares(avatarid);


--
-- Name: configuracion fk_idcategoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracion
    ADD CONSTRAINT fk_idcategoria FOREIGN KEY (idcategoria) REFERENCES public.categoria(idcategoria);


--
-- Name: jugador_partida fk_jugadorid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugador_partida
    ADD CONSTRAINT fk_jugadorid FOREIGN KEY (jugadorid) REFERENCES public.registro_jugador(jugadorid);


--
-- PostgreSQL database dump complete
--

