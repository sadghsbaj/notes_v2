[Collaboration](/docs/collaboration/getting-started/overview)/

[Documents](/docs/collaboration/documents)

Copy markdownAsk AI

# Semantic Search

Restricted ReleaseBeta

Tiptap Semantic Search brings AI-native search capabilities to your document library, making it easy to discover relationships and connections across all your documents through contextual understanding provided by large language models.

Searching through large document archives can be challenging, especially if you miss the exact keywords. Semantic Search addresses this by interpreting the intent behind the search query and the contextual meaning within your documents.

The LLM’s interpretation is encoded as numerical representations, known as vectors or embeddings, which capture the semantic meaning of both new and existing content. These embeddings can then be easily compared to retrieve the most relevant documents.

## [](#live-demo)Live demo

Below is an interactive demo of Tiptap Semantic Search. Type into the editor on the left, and watch as the search results update in real time with the most contextually relevant pages from our public documentation. Discover more details about the demo in our [examples](https://ai-demo.tiptap.dev/preview/Examples/SemanticSearch).

## [](#get-started)Get started

### [](#how-it-works)How it works

When you input a query, the following things happen:

1.  **Embedding**: Your query is transformed into a high-dimensional vector using a model optimized for similarity search.
2.  **Vector search**: This vector is compared with the existing vectors of your document library. The comparison process is based on similarity metrics to identify the most relevant documents.
3.  **Context-aware results**: Documents are ranked according to their semantic similarity to the query, so that even if the words don't match, the most relevant content is surfaced.

We have configured these operations in the background, making the complex process transparent to you as you set up and use this new Tiptap feature. With Tiptap Semantic Search, you can:

-   **Improve search relevance**: Retrieve documents that match the intent of a query, not just keywords.
-   **Understand context**: Recognize synonyms, related concepts, and varying word order to find the most pertinent results.
-   **Enhance user experience**: Deliver more accurate and meaningful search results, improving their interaction with content.

This is particularly valuable for knowledge management systems, document retrieval, idea generation, or any application where precise, context-aware search results are critical.

### [](#perform-a-search)Perform a search

To perform a search, use the search endpoint as described [in the REST API documentation](/docs/collaboration/documents/rest-api#search-documents).

```
curl -X POST https://YOUR_APP_ID.collab.tiptap.cloud/api/search \
  -H "Authorization: YOUR_SECRET_FROM_SETTINGS_AREA" \
  -H "Content-Type: application/json" \
  -d '{"content": "Your search terms"}'
```

### Keeping your API key secret

Please make sure that you handle the requests in your own backend in order to keep your API key secret.

## [](#using-retrieval-augmented-generation-rag)Using Retrieval-Augmented Generation (RAG)

Use RAG to pull relevant information from your library and feed it into large language models, improving the quality of AI-generated content with contextually accurate data. Discover more details about the demo in our [examples](https://ai-demo.tiptap.dev/preview/Examples/RAG).

[PreviouslyInject content](/docs/collaboration/documents/content-injection)

[Next upConfigure runtime](/docs/collaboration/operations/configure)
