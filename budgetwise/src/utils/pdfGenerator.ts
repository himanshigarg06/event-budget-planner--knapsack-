import type { OptimizationResult, EventConfig } from '../types'

/**
 * Generates and downloads a clean, professional PDF / Print report for the Event Budget plan.
 * Uses native browser document rendering to build a print-ready PDF layout with no external dependencies required.
 */
export function generatePDFReport(result: OptimizationResult, config: EventConfig) {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`

  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to export the PDF report.')
    return
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${config.eventName || 'Event'} - Budget Optimization Report</title>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      font-size: 13px;
      line-height: 1.5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #6366f1;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .title {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    .subtitle {
      font-size: 13px;
      color: #64748b;
      margin-top: 4px;
    }
    .meta {
      text-align: right;
      font-size: 12px;
      color: #64748b;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      background: #e0e7ff;
      color: #4338ca;
      margin-top: 6px;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }
    .kpi-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
    }
    .kpi-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      font-weight: 600;
    }
    .kpi-val {
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 4px;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin-top: 24px;
      margin-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 12px;
    }
    th {
      background: #f1f5f9;
      color: #475569;
      text-align: left;
      padding: 8px 10px;
      font-weight: 700;
      border-bottom: 1px solid #cbd5e1;
    }
    td {
      padding: 8px 10px;
      border-bottom: 1px solid #e2e8f0;
    }
    tr:nth-child(even) {
      background: #f8fafc;
    }
    .text-right {
      text-align: right;
    }
    .recommendation-box {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-left: 4px solid #f59e0b;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 8px;
    }
    .footer {
      margin-top: 40px;
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button onclick="window.print()" style="background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">
      🖨️ Print / Save as PDF
    </button>
  </div>

  <div class="header">
    <div>
      <h1 class="title">${config.eventName || 'Event Budget Optimization Report'}</h1>
      <div class="subtitle">Optimized using 0/1 Knapsack Dynamic Programming Algorithm</div>
      <div class="badge">Algorithm: ${result.algorithm.toUpperCase()}</div>
    </div>
    <div class="meta">
      <div><strong>Date:</strong> ${dateStr}</div>
      <div><strong>Event Type:</strong> ${config.eventType}</div>
      <div><strong>Guest Count:</strong> ${config.guests || 0}</div>
    </div>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-label">Total Allocated Budget</div>
      <div class="kpi-val">${formatCurrency(config.budget)}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total Estimated Cost</div>
      <div class="kpi-val" style="color: #4f46e5;">${formatCurrency(result.totalCost)}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Remaining Budget Saved</div>
      <div class="kpi-val" style="color: #059669;">${formatCurrency(result.remainingBudget)}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Optimization Score</div>
      <div class="kpi-val" style="color: #7c3aed;">${result.optimizationScore}%</div>
    </div>
  </div>

  <div class="section-title">Selected Vendors (${result.selectedVendors.length})</div>
  <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>Vendor Name</th>
        <th>Category</th>
        <th>Rating</th>
        <th class="text-right">Cost (₹)</th>
        <th class="text-right">Value Score</th>
      </tr>
    </thead>
    <tbody>
      ${result.selectedVendors.map((v, i) => `
        <tr>
          <td>${i + 1}</td>
          <td><strong>${v.name}</strong></td>
          <td>${v.category}</td>
          <td>⭐ ${v.rating}</td>
          <td class="text-right">${formatCurrency(v.cost)}</td>
          <td class="text-right">${v.value} pts</td>
        </tr>
      `).join('')}
    </tbody>
    <tfoot>
      <tr style="font-weight: bold; background: #f1f5f9;">
        <td colspan="4">Total</td>
        <td class="text-right">${formatCurrency(result.totalCost)}</td>
        <td class="text-right">${result.totalValue} pts</td>
      </tr>
    </tfoot>
  </table>

  ${result.rejectedVendors.length > 0 ? `
    <div class="section-title">Vendors Not Included (${result.rejectedVendors.length})</div>
    <table>
      <thead>
        <tr>
          <th>Vendor Name</th>
          <th>Category</th>
          <th>Rating</th>
          <th class="text-right">Cost (₹)</th>
          <th class="text-right">Value Score</th>
        </tr>
      </thead>
      <tbody>
        ${result.rejectedVendors.map(v => `
          <tr style="color: #64748b;">
            <td>${v.name}</td>
            <td>${v.category}</td>
            <td>⭐ ${v.rating}</td>
            <td class="text-right">${formatCurrency(v.cost)}</td>
            <td class="text-right">${v.value} pts</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  ` : ''}

  ${result.recommendations.length > 0 ? `
    <div class="section-title">Smart Optimization Insights</div>
    ${result.recommendations.map(rec => `
      <div class="recommendation-box">
        <strong>${rec.impact.toUpperCase()} IMPACT (${rec.type}):</strong> ${rec.message}
      </div>
    `).join('')}
  ` : ''}

  <div class="footer">
    <div>Generated by BudgetWise Event Planner</div>
    <div>Page 1 of 1</div>
  </div>

  <script>
    // Automatically trigger print prompt when loaded
    window.onload = function() {
      setTimeout(function() { window.print(); }, 500);
    }
  </script>
</body>
</html>
  `

  printWindow.document.open()
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
