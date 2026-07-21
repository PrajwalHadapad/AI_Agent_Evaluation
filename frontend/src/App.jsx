import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import HomePage from './pages/HomePage.jsx';
import EvaluationInputPage from './pages/EvaluationInputPage.jsx';
import KnowledgeBasePage from './pages/KnowledgeBasePage.jsx';
import DocumentChunkingPage from './pages/DocumentChunkingPage.jsx';
import EmbeddingGenerationPage from './pages/EmbeddingGenerationPage.jsx';
import VectorDatabasePage from './pages/VectorDatabasePage.jsx';
import SemanticRetrievalPage from './pages/SemanticRetrievalPage.jsx';
import EvaluationsHistoryPage from './pages/EvaluationsHistoryPage.jsx';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/landing" element={<HomePage />} />
          <Route path="/evaluation" element={<EvaluationInputPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/document-chunking" element={<DocumentChunkingPage />} />
          <Route path="/embeddings" element={<EmbeddingGenerationPage />} />
          <Route path="/vector-store" element={<VectorDatabasePage />} />
          <Route path="/retrieval" element={<SemanticRetrievalPage />} />
          <Route path="/evaluations" element={<EvaluationsHistoryPage />} />
          <Route path="/analytics" element={<div className="p-8 rounded-2xl bg-theme-sidebar/45 border border-theme-border/40 text-center text-theme-text-muted hover-lift">Advanced Pipeline Metrics & Trends — Coming Soon</div>} />
          <Route path="/settings" element={<div className="p-8 rounded-2xl bg-theme-sidebar/45 border border-theme-border/40 text-center text-theme-text-muted hover-lift">Evaluation Platform Settings — Coming Soon</div>} />
          <Route path="/docs" element={<div className="p-8 rounded-2xl bg-theme-sidebar/45 border border-theme-border/40 text-center text-theme-text-muted hover-lift">Developer APIs & Integration Docs — Coming Soon</div>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

