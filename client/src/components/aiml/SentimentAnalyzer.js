import React, { useState } from 'react';
// Import the sentiment library
import Sentiment from 'sentiment';

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    if (!text) return;
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const sentiment = new Sentiment();
      const analysisResult = sentiment.analyze(text);
      const score = analysisResult.score;
      let sentimentResult = 'Neutral';
      if (score > 0) sentimentResult = 'Positive';
      if (score < 0) sentimentResult = 'Negative';

      setResult({ sentiment: sentimentResult, score: score });
      setIsLoading(false);
    }, 500);
  };

  const getResultColor = () => {
    if (!result) return 'var(--text-secondary)';
    if (result.score > 0) return '#23d18b';
    if (result.score < 0) return '#f47067';
    return 'var(--text-secondary)';
  };

  return (
    <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
      <h3>Try the AI Sentiment Analyzer</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>This tool analyzes text sentiment using the AFINN wordlist.</p>
      
      <div className="form-group">
        <textarea
          value={text}
          // --- THIS IS THE CORRECTED LINE ---
          onChange={(e) => setText(e.target.value)}
          className="form-textarea"
          rows="4"
          placeholder="e.g., 'I love building awesome new features!'"
        />
      </div>
      <button onClick={handleAnalyze} className="btn" disabled={isLoading || !text}>
        {isLoading ? 'Analyzing...' : 'Analyze Text'}
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Analysis Result:</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getResultColor() }}>
            {result.sentiment}
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Comparative Score: {result.score.toFixed(2)} (Positive is &gt; 0, Negative is &lt; 0)
          </p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalyzer;