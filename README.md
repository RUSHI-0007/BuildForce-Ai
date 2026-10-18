# BuildForce AI — Construction Operating System for Small Contractors

BuildForce AI is a focused operational platform built for independent civil contractors, small residential builders, and trade specialists running 1 to 10 active sites.

## 🔒 Security & Environment Configuration

> **IMPORTANT**:
> - Never commit `.env` or any production secrets to Git.
> - Store all environment variables in **Vercel's Project Settings → Environment Variables** (or your hosting provider's secret vault).
> - Always enable **Row Level Security (RLS)** and appropriate access policies on any Supabase table storing business data.
> - Use `.env.example` as a template with placeholder variable names only.

## 🤖 Agents Status: What is Real vs. Building

### 3 Live Agents (Computed from Real Site Data)
1. **Cash & Bills AI (`cash`)**:
   - 12-week forward-looking cashflow simulation (Expected vs. Pessimistic).
   - Priority-based allocation: worker wages protected first, dealer grace periods, non-critical material order shifts, and real funding gap identification.
   - 3-Way Invoice Audit: Automated cross-match between Purchase Order, Delivery Challan, and Vendor Tax Invoice. Flags quantity, rate variance, line math, and HSN discrepancies.
   - Credit Readiness Checklist: Replaces fake credit offers with genuine audit tracking to help contractors prepare verified bankable records.

2. **Procurement & RFQ AI (`procurement`)**:
   - Stock runout and shortage forecasting based on real consumption rates, task need-by dates, and dealer lead times.
   - Multi-dealer RFQ generator for WhatsApp dispatch in English, Hindi, and Marathi.
   - Quote comparison with landed costs, credit terms, and delivery timeline penalties.
   - Supplier scorecard derived from actual delivery receipts and invoice history.

3. **Site Scheduler & PM AI (`scheduler`)**:
   - Critical Path Method (CPM) engine with early/late dates, float calculations, and predicted completion dates.
   - Real planned vs. actual S-curve and Schedule Performance Index (SPI).
   - Roadblock detection: low attendance, material shortages, and rain risk integration.
   - Re-planning recovery generator that preserves Version 1 baseline while generating Version N+1.
   - Client-safe Daily Progress Report (DPR) generator.

### 2 Building Agents (Honest Roadmap)
4. **Estimator & Takeoff AI (`estimator`)**: Under development. Currently supports manual quantity logging; automated drawing geometry takeoff is in active development.
5. **Quality & Snags AI (`quality`)**: Under development. Pre-pour inspection checklists and photo-verified snag resolution are currently in progress.

## 🛠️ Tech Stack & Scripts

- **Framework**: React 19 + Vite (Plain JS/JSX)
- **State**: React Context (`AppContext.jsx`) with versioned `localStorage` persistence
- **Testing**: Vitest (`npm test`)
- **Linting**: Oxlint (`npm run lint`)

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run unit tests
npm test

# Run linter
npm run lint

# Production build
npm run build
```
