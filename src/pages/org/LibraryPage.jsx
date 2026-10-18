import React, { useState } from 'react';
import { BookOpen, Plus, Search, Tag, IndianRupee } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';

export function LibraryPage() {
  const [rates, setRates] = useState([
    { id: 'r_1', item: 'M20 Grade RCC Casting (Column/Beam)', unit: 'cu.m', labour_rate: 1850, material_rate: 4600, total: 6450 },
    { id: 'r_2', item: '6" Fly Ash / Red Brick Masonry (1:6 Cement Mortar)', unit: 'sq.m', labour_rate: 220, material_rate: 580, total: 800 },
    { id: 'r_3', item: 'Internal 12mm Sand-Face Cement Plaster', unit: 'sq.ft', labour_rate: 22, material_rate: 18, total: 40 },
    { id: 'r_4', item: 'External Double-Coat Waterproof Plaster', unit: 'sq.ft', labour_rate: 34, material_rate: 28, total: 62 },
    { id: 'r_5', item: 'Vitrified Tile Flooring (2x2 ft)', unit: 'sq.ft', labour_rate: 28, material_rate: 65, total: 93 },
    { id: 'r_6', item: 'Concealed CPVC/PVC Plumbing Line', unit: 'Running Ft', labour_rate: 45, material_rate: 75, total: 120 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ item: '', unit: 'sq.ft', labour_rate: '', material_rate: '' });

  const filteredRates = rates.filter(r => r.item.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.item.trim()) return;
    const l = Number(form.labour_rate) || 0;
    const m = Number(form.material_rate) || 0;
    setRates(prev => [{
      id: 'r_' + Date.now(),
      item: form.item,
      unit: form.unit,
      labour_rate: l,
      material_rate: m,
      total: l + m
    }, ...prev]);
    setIsModalOpen(false);
    setForm({ item: '', unit: 'sq.ft', labour_rate: '', material_rate: '' });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Rate Library & BOQ Unit Economics
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Standardised rates for labour and material to prepare quick estimates and client quotations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            background: '#2563eb',
            color: '#ffffff',
            fontSize: '13.5px',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} />
          <span>Add Custom Rate</span>
        </button>
      </div>

      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search work item or trade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
          <span style={{ fontSize: '12.5px', color: '#64748b' }}>Showing {filteredRates.length} standard items</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b' }}>
                <th style={{ padding: '12px 20px', fontWeight: '600' }}>Item Description</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Unit</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Labour Rate (₹)</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Material Rate (₹)</th>
                <th style={{ padding: '12px 20px', fontWeight: '600', textAlign: 'right' }}>Total Working Rate (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredRates.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0f172a' }}>
                    {r.item}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {r.unit}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>
                    ₹{r.labour_rate}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>
                    ₹{r.material_rate}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: '700', color: '#2563eb' }}>
                    ₹{r.total} / {r.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Work Rate Item"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Work Item Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Granite Door Frame Fixing"
              value={form.item}
              onChange={(e) => setForm({ ...form, item: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Unit
              </label>
              <input
                type="text"
                placeholder="sq.ft / r.ft"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Labour Rate (₹)
              </label>
              <input
                type="number"
                placeholder="40"
                value={form.labour_rate}
                onChange={(e) => setForm({ ...form, labour_rate: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Material Rate (₹)
              </label>
              <input
                type="number"
                placeholder="120"
                value={form.material_rate}
                onChange={(e) => setForm({ ...form, material_rate: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{ padding: '9px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '13px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 18px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#ffffff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              Save Rate
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
