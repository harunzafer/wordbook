# Wordbook

An online dictionary platform for English learners with multilingual support. Built with SvelteKit, TypeScript, Tailwind CSS, and DaisyUI.

## Features

- **Simplified Definitions**: Clear and concise word descriptions
- **Contextual Learning**: Example sentences for practical usage
- **Common Translations**: Most frequently-used translations
- **Multilingual Support**: 8 languages (English, French, German, Italian, Polish, Portuguese, Spanish, Turkish)

## Tech Stack

- **Framework**: SvelteKit (Svelte 5)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Database**: AWS DynamoDB
- **Deployment**: Vercel

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   ```sh
   cp .env.example .env
   ```

   Edit `.env` and add your AWS credentials:
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   ```

3. **Start development server:**
   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## API Documentation

### Word Lookup

**Endpoint:** `POST /api/lookup`

**Description:** Get word details with translations

**Request Body:**
```json
{
  "word": "Africa",
  "from_lang": "en",
  "to_lang": "fr"
}
```

**Example:**
```sh
curl -X POST http://localhost:5173/api/lookup \
  -H "Content-Type: application/json" \
  -d '{"word":"Africa","from_lang":"en","to_lang":"fr"}'
```

**Response:**
```json
{
  "word": "Africa",
  "lang": "en",
  "translations": [
    {
      "translation": "Afrique",
      "type": "noun",
      "example": "I have always wanted to visit Africa.",
      "description": "The world's second-largest and second-most-populous continent..."
    }
  ]
}
```

**Supported Languages:** `en`, `fr`, `de`, `it`, `pl`, `pt`, `es`, `tr`

**Error Responses:**
- `400` - Invalid input (missing or empty parameters)
- `404` - Word not found
- `500` - Internal server error

### Word Suggestions

**Endpoint:** `POST /api/suggest`

**Description:** Get autocomplete suggestions for word search

**Request Body:**
```json
{
  "prefix": "hel",
  "from_lang": "en",
  "to_lang": "fr"
}
```

**Example:**
```sh
curl -X POST http://localhost:5173/api/suggest \
  -H "Content-Type: application/json" \
  -d '{"prefix":"hel","from_lang":"en","to_lang":"fr"}'
```

**Response:**
```json
[
  {
    "word": "held",
    "lang": "en"
  },
  {
    "word": "heldentenor",
    "lang": "en"
  },
  {
    "word": "helicopter",
    "lang": "en"
  },
  {
    "word": "hello",
    "lang": "en"
  }
]
```

**Notes:**
- Prefix should be at least 3 characters for optimal results
- Returns deduplicated suggestions from multiple languages
- Supports both ASCII and non-ASCII prefixes

**Supported Languages:** `en`, `fr`, `de`, `it`, `pl`, `pt`, `es`, `tr`

**Error Responses:**
- `400` - Invalid input (missing or empty parameters)
- `500` - Internal server error

## Building

To create a production version:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Deployment

This project uses Vercel for deployment with the `@sveltejs/adapter-auto` adapter.

## Project Structure

```
src/
├── lib/
│   ├── server/
│   │   └── db/
│   │       └── dynamodb.ts       # DynamoDB client
│   └── types/
│       ├── language.ts            # Language types
│       ├── word.ts                # Word and translation types
│       ├── api.ts                 # API request/response types
│       └── SCHEMA.md              # Database schema documentation
├── routes/
│   ├── api/
│   │   └── lookup/
│   │       └── +server.ts         # Word lookup API
│   └── +page.svelte               # Homepage
└── app.css                        # Global styles
```

## Database Schema

### Table: WordBook

**Primary Keys:**
- **Partition Key**: `word` (String) - The word itself
- **Sort Key**: `lang` (String) - Language code

**Global Secondary Indexes:**

1. **prefixIndex** - For fast autocomplete
   - Partition Key: `prefix` (first 3 characters)
   - Sort Key: `word`

2. **asciiPrefixIndex** - For special character support
   - Partition Key: `asciiPrefix` (first 3 ASCII characters)
   - Sort Key: `ascii` (ASCII version of word)

### Data Structure

#### Type 1: English Words (lang='en')
Stores meanings and translations to all languages.

```json
{
  "word": "hello",
  "lang": "en",
  "prefix": "hel",
  "meanings": [
    {
      "type": "noun",
      "description": "A greeting or expression of goodwill",
      "sample_sentence": "She greeted him with a warm hello.",
      "translations_fr": ["bonjour", "salut"],
      "translations_de": ["hallo"],
      "translations_it": ["ciao"],
      "translations_pl": ["cześć"],
      "translations_pt": ["olá"],
      "translations_es": ["hola"],
      "translations_tr": ["merhaba"]
    }
  ]
}
```

#### Type 2: Non-English Words
Points to English words with examples.

```json
{
  "word": "bonjour",
  "lang": "fr",
  "prefix": "bon",
  "translations": [
    {
      "word": "hello",
      "type": "noun",
      "description": "A greeting",
      "example": "Bonjour, comment allez-vous?"
    }
  ]
}
```

### Query Patterns

**Word Lookup:**
```
GetItem(word="hello", lang="en")
```

**Autocomplete:**
```
Query prefixIndex WHERE prefix="hel" AND word BEGINS_WITH "hel"
Query asciiPrefixIndex WHERE asciiPrefix="hel" AND ascii BEGINS_WITH "hel"
Filter by from_lang OR to_lang
```

## License

See live site: [wordbook.ca](https://wordbook.ca)
