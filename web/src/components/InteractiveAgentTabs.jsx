import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle, ArrowRight, ChevronRight, Zap 
} from 'lucide-react';
import { AI_AGENTS } from '../data/mockData';

export function InteractiveAgentTabs({ onLaunchPortalWithAgent }) {
  const [activeTab, setActiveTab] = useState('Progress & Quality');
  const [scheduleReplanDone, setScheduleReplanDone] = useState(false);

  const tabsContent = {
    'Pre-construction': {
      quote: '"Bungalow takeoff cut from 3 days down to 4 minutes"',
      author: 'Nilesh Patil',
      company: 'Patil Constructions, Nashik',
      features: [
        {
          title: 'Automated 2D/3D Drawing Quantities Extraction',
          desc: 'Reads residential & commercial CAD floor plans, detects structural columns/slabs and builds accurate BOQs.'
        },
        {
          title: 'Structured Quantity & BOQ Takeoff (Concept Preview)',
          desc: 'Log concrete cum, TMT steel MT, brickwork sqm, and tile areas with contractor markup.'
        },
        {
          title: 'Audit-ready Source Sheet Citations',
          desc: 'Click any BOQ number to highlight its exact geometry on the structural CAD sheet.'
        }
      ],
      agentId: 'estimation',
      preview: {
        title: 'Residential Takeoff in Progress',
        tag: 'AI TAKEOFF READY',
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#132854', padding: 12, borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: '#93c5fd' }}>DWG A-3 Kothrud Residence Villa</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>Sample Takeoff</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>5" Reinforced Concrete Slab & Beams (M20)</div>
              <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 4 }}>
                Quantity: <strong>48 cum</strong> • Estimated Rate: <strong>₹6,800 / cum</strong> • Total: <strong>₹3,26,400</strong>
              </div>
            </div>
            <div style={{ background: '#0b1c3e', padding: 12, borderRadius: 8, fontSize: 12 }}>
              <div style={{ color: '#60a5fa', fontWeight: 700, marginBottom: 4 }}>Formula Linked to Geometry:</div>
              <code style={{ color: '#38bdf8', fontSize: 11 }}>Roof Slab Area (280 sqm) × Thk (0.125m) + Dropped Beams (13 cum)</code>
            </div>
            <button 
              onClick={() => onLaunchPortalWithAgent('estimation')}
              style={{ 
                background: '#0f766e', 
                color: '#fff', 
                padding: '10px 16px', 
                borderRadius: 6, 
                fontWeight: 700, 
                fontSize: 13,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 8 
              }}
            >
              <span>Inspect Full BOQ in Portal</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )
      }
    },

    'Progress & Quality': {
      quote: '"Zero unrecorded delays. Daily haazri & site photos sync with WhatsApp"',
      author: 'Santosh More',
      company: 'More Associates Civil Works, Pune',
      features: [
        {
          title: 'Real-time progress updates on your schedule',
          desc: 'See daily work done with supervisor photo proofs, material used, and labour attendance.'
        },
        {
          title: '✦ Project Manager AI keeps small sites on track',
          desc: 'Proactively flags mason productivity deficits and auto-rebalances crews across your active sites.'
        },
        {
          title: 'Raise issues and clear roadblocks faster',
          desc: 'Automated photo detection of concrete honeycomb voids and defective brick bonding.'
        },
        {
          title: 'Deliver quality work with site checklists',
          desc: 'Daily checklist audits for concrete slump, curing water logs, and shuttering removal.'
        }
      ],
      agentId: 'project_manager',
      preview: {
        title: 'Site Actionables & Delay Recovery',
        tag: 'LIVE SITE INTELLIGENCE',
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#132854', padding: 12, borderRadius: 8, opacity: scheduleReplanDone ? 0.4 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 12, color: '#93c5fd' }}>Current Delay Risk</div>
                <span style={{ fontSize: 11, background: '#7f1d1d', color: '#fca5a5', padding: '2px 6px', borderRadius: 4 }}>
                  Lag: 3 days on 1st Floor Brickwork
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginTop: 6 }}>
                Mortar mixer breakdown caused 7% productivity drop at Site A1.
              </div>
            </div>

            <div style={{ 
              background: scheduleReplanDone ? '#064e3b' : '#1e3a6a', 
              border: '1px solid #3b82f6', 
              padding: 14, 
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, background: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
                  AI RECOMMENDATION
                </span>
                <span style={{ fontSize: 11, color: '#34d399', fontWeight: 700 }}>
                  RECOVER IN 48 HRS
                </span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 8 }}>
                Transfer 2 masons from Katraj Site B1 to Kothrud
              </div>
              <div style={{ fontSize: 12, color: '#93c5fd', marginTop: 4 }}>
                Impacted delay: <strong>0 days</strong> (Restores milestone for Tuesday pour)
              </div>

              <button 
                onClick={() => setScheduleReplanDone(!scheduleReplanDone)}
                style={{ 
                  marginTop: 12,
                  width: '100%',
                  background: scheduleReplanDone ? '#10b981' : '#ffffff', 
                  color: scheduleReplanDone ? '#ffffff' : '#071530', 
                  padding: '10px 16px', 
                  borderRadius: 6, 
                  fontWeight: 800, 
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer'
                }}
              >
                {scheduleReplanDone ? (
                  <>
                    <CheckCircle size={16} />
                    <span>Crew Transferred & Schedule Recovered!</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} style={{ color: '#2563eb' }} />
                    <span>Apply AI Reallocation (1-Click)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )
      }
    },

    'Cashflow': {
      quote: '"Zero Saturday wage payout panic across our 3 sites"',
      author: 'Omkar Deshmukh',
      company: 'Omkar Infrastructure & Builders, Pune',
      features: [
        {
          title: '12-Week Interactive Cashflow Runway Planner',
          desc: 'Simulate client payment delays (0–30 days) and test your safe weekly withdrawal buffer.'
        },
        {
          title: '✦ Contractor Credit AI unlocks ₹15 Lakhs working capital',
          desc: 'Instant UPI credit line to pay Saturday worker wages when homeowner milestone checks are delayed.'
        },
        {
          title: '3-Way Invoice & Delivery Challan Audit',
          desc: 'Matches Purchase Order, Gate delivery slip, and dealer invoice to eliminate billing leaks.'
        }
      ],
      agentId: 'credit_cashflow',
      preview: {
        title: 'Working Capital Health & Buffer',
        tag: 'CASH RUNWAY SAFE',
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#132854', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: '#93c5fd' }}>Contractor Revolving Credit Line</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#34d399', marginTop: 4 }}>₹15,00,000 Unlocked</div>
              <div style={{ fontSize: 11, color: '#cbd5e1', marginTop: 2 }}>Instant UPI • 0% for first 30 days</div>
            </div>
            <div style={{ background: '#0b1c3e', padding: 12, borderRadius: 8, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Drawn for Saturday Wages & Cement:</span>
                <strong>₹4.50 Lakhs</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginTop: 4 }}>
                <span>Remaining Cash Buffer:</span>
                <strong style={{ color: '#38bdf8' }}>₹10.50 Lakhs</strong>
              </div>
            </div>
            <button 
              onClick={() => onLaunchPortalWithAgent('credit_cashflow')}
              style={{ 
                background: '#0284c7', 
                color: '#fff', 
                padding: '10px 16px', 
                borderRadius: 6, 
                fontWeight: 700, 
                fontSize: 13,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 8 
              }}
            >
              <span>Manage Working Capital in Portal</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )
      }
    },

    'Material': {
      quote: '"Saved ₹4,500 on cement bags and prevented a 2-day site stoppage"',
      author: 'Rajesh Sawant',
      company: 'Sawant Civil & Turnkey Works, Pune',
      features: [
        {
          title: '3-Way Local Hardware Depot Comparison',
          desc: 'Instant price check across Mahalaxmi Hardware, Shree Balaji Traders, and Pune City Mart.'
        },
        {
          title: '✦ Early Warning Radar flags stockouts 48 hrs early',
          desc: 'Alerts contractor when cement stock drops below 80 bags so masons never sit idle.'
        },
        {
          title: '1-Click WhatsApp Purchase Orders',
          desc: 'Generates GST-compliant POs dispatched directly to local dealer WhatsApp desks.'
        }
      ],
      agentId: 'procurement',
      preview: {
        title: 'Local Hardware Depot RFQ Comparison',
        tag: 'MATERIAL DISPATCH',
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: '#132854', padding: 12, borderRadius: 8, border: '1px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#fff' }}>Mahalaxmi Hardware (Kothrud Depot)</strong>
                <span style={{ fontSize: 10, background: '#10b981', color: '#fff', padding: '1px 6px', borderRadius: 3 }}>
                  SAVING ₹4,500
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#cbd5e1', marginTop: 6 }}>
                <span>Rate: ₹365 / bag (Prev ₹395)</span>
                <span>Delivery: 3 Hours</span>
              </div>
            </div>
            <div style={{ background: '#0b1c3e', padding: 10, borderRadius: 8, fontSize: 12, color: '#94a3b8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shree Balaji Building Traders</span>
                <span>₹372 / bag • Tomorrow Morning</span>
              </div>
            </div>
            <button 
              onClick={() => onLaunchPortalWithAgent('procurement')}
              style={{ 
                background: '#ea580c', 
                color: '#fff', 
                padding: '10px 16px', 
                borderRadius: 6, 
                fontWeight: 700, 
                fontSize: 13,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 8 
              }}
            >
              <span>Open Local RFQ Engine</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )
      }
    },

    'Labour': {
      quote: '"Supervisor logs haazri in 2 minutes. Weekend wage calculation is 100% automated"',
      author: 'Rushi Khalate',
      company: 'Site Supervisor, Kothrud Site A1',
      features: [
        {
          title: 'Daily Worker Haazri & Overtime Calculator',
          desc: 'Roster tracking for masons (₹850), majdoors (₹550), and steel fixers (₹900) with overtime pay.'
        },
        {
          title: 'Advance Cuts & Kharcha Reconciliation',
          desc: 'Automatically records daily food/chai cash advances so there is zero dispute on Saturday evening.'
        }
      ],
      agentId: 'project_manager',
      preview: {
        title: 'Today\'s Labour Roster (Site A1)',
        tag: '14 WORKERS ACTIVE',
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#132854', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Kothrud Site A1: 9 Workers Logged</div>
              <div style={{ fontSize: 12, color: '#93c5fd', marginTop: 4 }}>
                Subhash More (Mason) • Ganesh Shinde (Mason) • Dilip Jadhav (Helper)
              </div>
              <div style={{ fontSize: 11, color: '#34d399', marginTop: 6, fontWeight: 700 }}>
                Total Wages Today: ₹7,800 • Overtime: 5.0 hrs (+₹800)
              </div>
            </div>
            <button 
              onClick={() => onLaunchPortalWithAgent('project_manager')}
              style={{ background: '#0f766e', color: '#fff', padding: '10px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}
            >
              Open Labour & Wages Tracker
            </button>
          </div>
        )
      }
    },

    'Contractor': {
      quote: '"5-stage contract milestones guarantee we get paid before casting each slab"',
      author: 'Kadam Turnkey Projects',
      company: 'Pune & PCMC',
      features: [
        {
          title: 'Milestone Stage Billing & Retention Management',
          desc: '5 standard stages: Mobilization 15%, Plinth 25%, Slab 25%, Brickwork 20%, Finishing 15%.'
        },
        {
          title: 'Defect Liability 5% Retention Tracker',
          desc: 'Automates tracking of ₹62,500 retention release 12 months after project handover.'
        }
      ],
      agentId: 'planning_schedule',
      preview: {
        title: 'Kothrud Residence Milestones',
        tag: 'STAGE 3 RECEIVABLE',
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#132854', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Stage 3: Ground + 1 Slab Casting</div>
              <div style={{ fontSize: 12, color: '#34d399', marginTop: 4 }}>Receivable Amount: ₹3,68,750 (Invoice Dispatched)</div>
            </div>
            <button 
              onClick={() => onLaunchPortalWithAgent('planning_schedule')}
              style={{ background: '#7c3aed', color: '#fff', padding: '10px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}
            >
              View Contract Milestones
            </button>
          </div>
        )
      }
    },

    'Client': {
      quote: '"Clients approve extra work on WhatsApp with one click. Zero unpaid change orders"',
      author: 'Ramesh Chavan (Property Owner)',
      company: 'Kothrud Residence Project',
      features: [
        {
          title: 'Client WhatsApp Room Stream',
          desc: 'Direct authenticated stream with property owner to share progress photos and change order proposals.'
        },
        {
          title: 'Digital Scope & Price Sign-offs',
          desc: 'Client approves cost (+₹35k) and timeline impact (+3 days) on WhatsApp before extra work starts.'
        }
      ],
      agentId: 'project_manager',
      preview: {
        title: 'WhatsApp Client Room View',
        tag: 'CHANGE ORDER APPROVED',
        body: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#132854', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Client: Ramesh Chavan (Shanti Heights)</div>
              <div style={{ fontSize: 12, color: '#34d399', marginTop: 4 }}>Signed: Gypsum False Ceiling (+₹35,000 / +3 Days)</div>
            </div>
            <button 
              onClick={() => onLaunchPortalWithAgent('project_manager')}
              style={{ background: '#059669', color: '#fff', padding: '10px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}
            >
              Open Client WhatsApp Room
            </button>
          </div>
        )
      }
    }
  };

  const currentTabContent = tabsContent[activeTab] || tabsContent['Progress & Quality'];

  return (
    <section className="ai-agents-section">
      <div className="ai-agents-header">
        <h2 className="ai-agents-title">
          Win projects, and deliver them with <span className="ai-agents-sparkle">✦</span> AI agents
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 16 }}>
          Explore how specialized construction agents coordinate across every phase of project execution.
        </p>
      </div>

      {/* Tabs Navigation Pills */}
      <div className="agent-tabs-nav">
        {Object.keys(tabsContent).map((tab) => (
          <button
            key={tab}
            className={`agent-tab-pill ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Interactive Agent Showcase Layout */}
      <div className="agent-showcase-container">
        {/* Left Side: Testimonial & Features */}
        <div className="agent-showcase-left">
          <div className="agent-quote-box">
            <div className="agent-quote-text">{currentTabContent.quote}</div>
            <div className="agent-quote-author">
              <div className="agent-author-avatar">
                {currentTabContent.author.charAt(0)}
              </div>
              <div>
                <div className="agent-author-name">{currentTabContent.author}</div>
                <div className="agent-author-location">{currentTabContent.company}</div>
              </div>
            </div>
          </div>

          <div className="agent-features-list">
            {currentTabContent.features.map((feat, idx) => (
              <div 
                key={idx} 
                className={`agent-feature-row ${feat.highlight ? 'active' : ''}`}
              >
                <div className="agent-feature-icon">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="agent-feature-title">{feat.title}</div>
                  <div className="agent-feature-desc">{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onLaunchPortalWithAgent(currentTabContent.agentId)}
            className="btn-coral"
            style={{ padding: '12px 24px', fontSize: 15 }}
          >
            <span>Launch {activeTab} Agent in Workspace</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Right Side: Interactive Device Preview */}
        <div className="agent-device-card">
          <div className="agent-device-top">
            <span className="agent-device-tag">
              <Sparkles size={14} />
              {currentTabContent.preview.tag}
            </span>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>Real-time Project AI Loop</span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            {currentTabContent.preview.title}
          </h3>

          {currentTabContent.preview.body}
        </div>
      </div>

      {/* The 5 Domain-Trained AI Agents Cards Deck */}
      <div style={{ maxWidth: 1160, margin: '80px auto 0', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 8, 
          fontSize: 12, 
          color: '#60a5fa', 
          fontWeight: 800, 
          letterSpacing: 1, 
          textTransform: 'uppercase',
          marginBottom: 12 
        }}>
          <Sparkles size={14} />
          THE BUILDFORCE AI WORKFORCE SUITE
        </div>
        <h3 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
          Contractor Intelligence Suite. Built for Small Civil Projects.
        </h3>
        <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 640, margin: '0 auto 40px' }}>
          Real calculated numbers from your daily site records. No corporate fluff or unverified percentages.
        </p>

        <div className="agents-overview-grid">
          {AI_AGENTS.map((agent) => (
            <div 
              key={agent.id}
              className="agent-summary-card"
              onClick={() => onLaunchPortalWithAgent(agent.id)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ 
                    fontSize: 10, 
                    fontWeight: 800, 
                    background: 'rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    padding: '2px 8px', 
                    borderRadius: 4 
                  }}>
                    AGENT {agent.number}
                  </span>
                  <span style={{ fontSize: 11, color: agent.color, fontWeight: 700 }}>
                    {agent.badge}
                  </span>
                </div>

                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 8, textAlign: 'left' }}>
                  {agent.name}
                </div>

                <p style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.45, textAlign: 'left', marginBottom: 16 }}>
                  {agent.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12, textAlign: 'left' }}>
                <div style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700, marginBottom: 8 }}>
                  {agent.metrics}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 4, 
                  fontSize: 12, 
                  color: '#fff', 
                  fontWeight: 700 
                }}>
                  <span>Run Agent</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
