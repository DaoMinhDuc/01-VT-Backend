--
-- PostgreSQL database dump
--

--

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS "FK_ff56834e735fa78a15d0cf21926";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipts DROP CONSTRAINT IF EXISTS "FK_f925e9c8ee5c2648c12029875dc";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipts DROP CONSTRAINT IF EXISTS "FK_e13b6bb41cebb9b8e1f32194cfc";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipt_items DROP CONSTRAINT IF EXISTS "FK_b267f19cec151dbc2b3a69ec0e7";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipts DROP CONSTRAINT IF EXISTS "FK_52f7d5d4ec3d29c60622ebea72f";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipts DROP CONSTRAINT IF EXISTS "FK_39cbc10fdc35f6c7ee556f8fd11";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipts DROP CONSTRAINT IF EXISTS "FK_1beeb1d0884bc795a077825a346";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipt_items DROP CONSTRAINT IF EXISTS "FK_060ded1960d10e7f935fd40e109";
ALTER TABLE IF EXISTS ONLY public.warehouses DROP CONSTRAINT IF EXISTS "UQ_d8b96d60ff9a288f5ed862280d9";
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS "UQ_97672ac88f789774dd47f7c8be3";
ALTER TABLE IF EXISTS ONLY public.departments DROP CONSTRAINT IF EXISTS "UQ_91fddbe23e927e1e525c152baa3";
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS "UQ_7cfc24d6c24f0ec91294003d6b8";
ALTER TABLE IF EXISTS ONLY public.suppliers DROP CONSTRAINT IF EXISTS "UQ_6f01a03dcb1aa33822e19534cd6";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipts DROP CONSTRAINT IF EXISTS "UQ_24802348a967c6c084e8f7b5141";
ALTER TABLE IF EXISTS ONLY public.product_categories DROP CONSTRAINT IF EXISTS "UQ_03fac833e3bd77ac88846805305";
ALTER TABLE IF EXISTS ONLY public.suppliers DROP CONSTRAINT IF EXISTS "PK_b70ac51766a9e3144f778cfe81e";
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS "PK_a3ffb1c0c8416b9fc6f907b7433";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipt_items DROP CONSTRAINT IF EXISTS "PK_8ab6b6c89dd011c7cb7771f9c03";
ALTER TABLE IF EXISTS ONLY public.departments DROP CONSTRAINT IF EXISTS "PK_839517a681a86bb84cbcc6a1e9d";
ALTER TABLE IF EXISTS ONLY public.product_categories DROP CONSTRAINT IF EXISTS "PK_7069dac60d88408eca56fdc9e0c";
ALTER TABLE IF EXISTS ONLY public.warehouses DROP CONSTRAINT IF EXISTS "PK_56ae21ee2432b2270b48867e4be";
ALTER TABLE IF EXISTS ONLY public.warehouse_receipts DROP CONSTRAINT IF EXISTS "PK_10bc34b8a5d29a0affe909a57b8";
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS "PK_0806c755e0aca124e67c0cf6d7d";
ALTER TABLE IF EXISTS public.warehouses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.warehouse_receipts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.warehouse_receipt_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.suppliers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.departments ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.warehouses_id_seq;
DROP TABLE IF EXISTS public.warehouses;
DROP SEQUENCE IF EXISTS public.warehouse_receipts_id_seq;
DROP TABLE IF EXISTS public.warehouse_receipts;
DROP SEQUENCE IF EXISTS public.warehouse_receipt_items_id_seq;
DROP TABLE IF EXISTS public.warehouse_receipt_items;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.suppliers_id_seq;
DROP TABLE IF EXISTS public.suppliers;
DROP SEQUENCE IF EXISTS public.products_id_seq;
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public.product_categories_id_seq;
DROP TABLE IF EXISTS public.product_categories;
DROP SEQUENCE IF EXISTS public.departments_id_seq;
DROP TABLE IF EXISTS public.departments;
DROP TYPE IF EXISTS public.warehouse_receipts_status_enum;
DROP TYPE IF EXISTS public.users_role_enum;
--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.users_role_enum AS ENUM (
    'admin',
    'staff',
    'viewer'
);


ALTER TYPE public.users_role_enum OWNER TO admin;

--
-- Name: warehouse_receipts_status_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.warehouse_receipts_status_enum AS ENUM (
    'draft',
    'confirmed',
    'cancelled'
);


ALTER TYPE public.warehouse_receipts_status_enum OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: departments; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    code character varying(50) NOT NULL,
    description text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.departments OWNER TO admin;

--
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_id_seq OWNER TO admin;

--
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- Name: product_categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.product_categories (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    code character varying(50) NOT NULL,
    description text
);


ALTER TABLE public.product_categories OWNER TO admin;

--
-- Name: product_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.product_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_categories_id_seq OWNER TO admin;

--
-- Name: product_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.product_categories_id_seq OWNED BY public.product_categories.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.products (
    id integer NOT NULL,
    "categoryId" integer,
    name character varying(200) NOT NULL,
    code character varying(50) NOT NULL,
    brand character varying(200),
    specification character varying(200),
    "unitOfMeasure" character varying(50) DEFAULT 'Cái'::character varying NOT NULL,
    "unitPrice" numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO admin;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO admin;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    code character varying(50) NOT NULL,
    "contactPerson" character varying(150),
    phone character varying(20),
    address character varying(500),
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.suppliers OWNER TO admin;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_id_seq OWNER TO admin;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "fullName" character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    "passwordHash" character varying NOT NULL,
    role public.users_role_enum DEFAULT 'staff'::public.users_role_enum NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: warehouse_receipt_items; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.warehouse_receipt_items (
    id integer NOT NULL,
    "receiptId" integer NOT NULL,
    "productId" integer,
    "lineNumber" integer DEFAULT 1 NOT NULL,
    "productName" character varying(255) NOT NULL,
    "productCode" character varying(50),
    "unitOfMeasure" character varying(50) DEFAULT 'Cái'::character varying NOT NULL,
    "quantityDocument" numeric(15,3) DEFAULT '0'::numeric NOT NULL,
    "quantityActual" numeric(15,3) DEFAULT '0'::numeric NOT NULL,
    "unitPrice" numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    "totalAmount" numeric(18,2) DEFAULT '0'::numeric NOT NULL,
    note text
);


ALTER TABLE public.warehouse_receipt_items OWNER TO admin;

--
-- Name: warehouse_receipt_items_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.warehouse_receipt_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.warehouse_receipt_items_id_seq OWNER TO admin;

--
-- Name: warehouse_receipt_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.warehouse_receipt_items_id_seq OWNED BY public.warehouse_receipt_items.id;


--
-- Name: warehouse_receipts; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.warehouse_receipts (
    id integer NOT NULL,
    "createdById" integer,
    "departmentId" integer,
    "warehouseId" integer,
    "supplierId" integer,
    "receiptNumber" character varying(50) NOT NULL,
    "receiptDate" date NOT NULL,
    "companyName" character varying(200),
    "documentReference" character varying(200),
    "deliveryPerson" character varying(200),
    "debitAccount" character varying(20),
    "creditAccount" character varying(20),
    "totalAmount" numeric(18,2) DEFAULT '0'::numeric NOT NULL,
    "totalAmountInWords" text,
    status public.warehouse_receipts_status_enum DEFAULT 'draft'::public.warehouse_receipts_status_enum NOT NULL,
    note text,
    "confirmedById" integer,
    "confirmedAt" timestamp without time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.warehouse_receipts OWNER TO admin;

--
-- Name: warehouse_receipts_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.warehouse_receipts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.warehouse_receipts_id_seq OWNER TO admin;

--
-- Name: warehouse_receipts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.warehouse_receipts_id_seq OWNED BY public.warehouse_receipts.id;


--
-- Name: warehouses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.warehouses (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    code character varying(50) NOT NULL,
    location character varying(255),
    description text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.warehouses OWNER TO admin;

--
-- Name: warehouses_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.warehouses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.warehouses_id_seq OWNER TO admin;

--
-- Name: warehouses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.warehouses_id_seq OWNED BY public.warehouses.id;


--
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- Name: product_categories id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product_categories ALTER COLUMN id SET DEFAULT nextval('public.product_categories_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: warehouse_receipt_items id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipt_items ALTER COLUMN id SET DEFAULT nextval('public.warehouse_receipt_items_id_seq'::regclass);


--
-- Name: warehouse_receipts id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipts ALTER COLUMN id SET DEFAULT nextval('public.warehouse_receipts_id_seq'::regclass);


--
-- Name: warehouses id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouses ALTER COLUMN id SET DEFAULT nextval('public.warehouses_id_seq'::regclass);


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.departments (id, name, code, description, "isActive", "createdAt") FROM stdin;
1	gdsgsg	14214	\N	t	2026-04-27 14:59:41.219068
\.


--
-- Data for Name: product_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.product_categories (id, name, code, description) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.products (id, "categoryId", name, code, brand, specification, "unitOfMeasure", "unitPrice", "isActive", "createdAt") FROM stdin;
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.suppliers (id, name, code, "contactPerson", phone, address, "isActive", "createdAt") FROM stdin;
1	fầ	14214	bbb	bxxd	\N	f	2026-04-27 15:22:39.591212
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, "fullName", email, "passwordHash", role, "isActive", "createdAt", "updatedAt") FROM stdin;
1	Đào Minh Đức	duclc09062002@gmail.com	$2b$10$nJvj.KEhnUj.Z9njF6W.huOb.Gsa8WwniLu8Oqdx7BWsIl.fxT2I6	staff	t	2026-04-23 15:48:59.146056	2026-04-23 15:48:59.146056
2	Đào Minh Đức	duc09062002@gmail.com	$2b$10$vt8mXhA.caCP.PlwNdSyF.EBTR2c3SbmAamvNcjzwJ6iGkoFAD6Xi	staff	t	2026-04-27 14:28:21.728053	2026-04-27 14:28:21.728053
\.


--
-- Data for Name: warehouse_receipt_items; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.warehouse_receipt_items (id, "receiptId", "productId", "lineNumber", "productName", "productCode", "unitOfMeasure", "quantityDocument", "quantityActual", "unitPrice", "totalAmount", note) FROM stdin;
1	1	\N	1	vavav	14214	Cái	3.000	3.000	4.00	12.00	
\.


--
-- Data for Name: warehouse_receipts; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.warehouse_receipts (id, "createdById", "departmentId", "warehouseId", "supplierId", "receiptNumber", "receiptDate", "companyName", "documentReference", "deliveryPerson", "debitAccount", "creditAccount", "totalAmount", "totalAmountInWords", status, note, "confirmedById", "confirmedAt", "createdAt", "updatedAt") FROM stdin;
1	1	\N	\N	\N	Pn-525-525	2026-04-23	fsfsf	âfa	âf	100	331	12.00	Mười hai đồng	confirmed		2	2026-04-27 21:45:38.669	2026-04-23 15:49:58.860598	2026-04-27 14:45:38.6745
\.


--
-- Data for Name: warehouses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.warehouses (id, name, code, location, description, "isActive", "createdAt") FROM stdin;
\.


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.departments_id_seq', 1, true);


--
-- Name: product_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.product_categories_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: warehouse_receipt_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.warehouse_receipt_items_id_seq', 1, true);


--
-- Name: warehouse_receipts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.warehouse_receipts_id_seq', 1, true);


--
-- Name: warehouses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.warehouses_id_seq', 1, false);


--
-- Name: products PK_0806c755e0aca124e67c0cf6d7d; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);


--
-- Name: warehouse_receipts PK_10bc34b8a5d29a0affe909a57b8; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipts
    ADD CONSTRAINT "PK_10bc34b8a5d29a0affe909a57b8" PRIMARY KEY (id);


--
-- Name: warehouses PK_56ae21ee2432b2270b48867e4be; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT "PK_56ae21ee2432b2270b48867e4be" PRIMARY KEY (id);


--
-- Name: product_categories PK_7069dac60d88408eca56fdc9e0c; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY (id);


--
-- Name: departments PK_839517a681a86bb84cbcc6a1e9d; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY (id);


--
-- Name: warehouse_receipt_items PK_8ab6b6c89dd011c7cb7771f9c03; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipt_items
    ADD CONSTRAINT "PK_8ab6b6c89dd011c7cb7771f9c03" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: suppliers PK_b70ac51766a9e3144f778cfe81e; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY (id);


--
-- Name: product_categories UQ_03fac833e3bd77ac88846805305; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT "UQ_03fac833e3bd77ac88846805305" UNIQUE (code);


--
-- Name: warehouse_receipts UQ_24802348a967c6c084e8f7b5141; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipts
    ADD CONSTRAINT "UQ_24802348a967c6c084e8f7b5141" UNIQUE ("receiptNumber");


--
-- Name: suppliers UQ_6f01a03dcb1aa33822e19534cd6; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT "UQ_6f01a03dcb1aa33822e19534cd6" UNIQUE (code);


--
-- Name: products UQ_7cfc24d6c24f0ec91294003d6b8; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "UQ_7cfc24d6c24f0ec91294003d6b8" UNIQUE (code);


--
-- Name: departments UQ_91fddbe23e927e1e525c152baa3; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT "UQ_91fddbe23e927e1e525c152baa3" UNIQUE (code);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: warehouses UQ_d8b96d60ff9a288f5ed862280d9; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT "UQ_d8b96d60ff9a288f5ed862280d9" UNIQUE (code);


--
-- Name: warehouse_receipt_items FK_060ded1960d10e7f935fd40e109; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipt_items
    ADD CONSTRAINT "FK_060ded1960d10e7f935fd40e109" FOREIGN KEY ("receiptId") REFERENCES public.warehouse_receipts(id) ON DELETE CASCADE;


--
-- Name: warehouse_receipts FK_1beeb1d0884bc795a077825a346; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipts
    ADD CONSTRAINT "FK_1beeb1d0884bc795a077825a346" FOREIGN KEY ("createdById") REFERENCES public.users(id);


--
-- Name: warehouse_receipts FK_39cbc10fdc35f6c7ee556f8fd11; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipts
    ADD CONSTRAINT "FK_39cbc10fdc35f6c7ee556f8fd11" FOREIGN KEY ("confirmedById") REFERENCES public.users(id);


--
-- Name: warehouse_receipts FK_52f7d5d4ec3d29c60622ebea72f; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipts
    ADD CONSTRAINT "FK_52f7d5d4ec3d29c60622ebea72f" FOREIGN KEY ("departmentId") REFERENCES public.departments(id);


--
-- Name: warehouse_receipt_items FK_b267f19cec151dbc2b3a69ec0e7; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipt_items
    ADD CONSTRAINT "FK_b267f19cec151dbc2b3a69ec0e7" FOREIGN KEY ("productId") REFERENCES public.products(id);


--
-- Name: warehouse_receipts FK_e13b6bb41cebb9b8e1f32194cfc; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipts
    ADD CONSTRAINT "FK_e13b6bb41cebb9b8e1f32194cfc" FOREIGN KEY ("supplierId") REFERENCES public.suppliers(id);


--
-- Name: warehouse_receipts FK_f925e9c8ee5c2648c12029875dc; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.warehouse_receipts
    ADD CONSTRAINT "FK_f925e9c8ee5c2648c12029875dc" FOREIGN KEY ("warehouseId") REFERENCES public.warehouses(id);


--
-- Name: products FK_ff56834e735fa78a15d0cf21926; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES public.product_categories(id);


--
-- PostgreSQL database dump complete
--

\unrestrict snFNaNzm0389BZgQNjhDUHkBbhL4b5nfnAl1Po9H52v32OJK73nrvyP7oHeGUWS

