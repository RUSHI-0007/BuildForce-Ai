import React, { useState } from 'react';
import { 
  Folder, Plus, FileText, Image, Download, 
  Trash2, UploadCloud, Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';

export function DrivePage() {
  const { activeProject } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [files, setFiles] = useState([
    { id: 'f_1', name: 'Architectural_Floor_Plans_v2.pdf', type: 'PDF', size: '4.2 MB', date: '2026-08-05' },
    { id: 'f_2', name: 'Structural_Column_Reinforcement_Detail.dwg', type: 'CAD', size: '12.8 MB', date: '2026-08-12' },
    { id: 'f_3', name: 'PMC_Municipal_Sanction_Order.pdf', type: 'PDF', size: '1.8 MB', date: '2026-07-28' },
    { id: 'f_4', name: 'Plinth_Level_Site_Inspection.jpg', type: 'Image', size: '3.4 MB', date: '2026-09-02' }
  ]);

  const [newFileForm, setNewFileForm] = useState({
    name: '',
    type: 'PDF',
    size: '2.5 MB'
  });

  const handleAddFile = (e) => {
    e.preventDefault();
    if (!newFileForm.name.trim()) return;
    setFiles(prev => [{
      id: 'f_' + Date.now(),
      name: newFileForm.name,
      type: newFileForm.type,
      size: newFileForm.size,
      date: new Date().toISOString().split('T')[0]
    }, ...prev]);
    setIsModalOpen(false);
    setNewFileForm({ name: '', type: 'PDF', size: '2.5 MB' });
  };

  const handleDelete = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Site Drive & Drawings
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {activeProject ? `Blueprints and site photos for ${activeProject.name}` : 'Centralized file storage for plans and approvals'}
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
          <UploadCloud size={16} />
          <span>Upload File</span>
        </button>
      </div>

      {files.length === 0 ? (
        <EmptyState
          icon={Folder}
          title="No Drawings or Documents Uploaded"
          description="Keep architectural PDFs, structural CAD files, and site inspection photos in one organized site drive."
          actionLabel="Upload First Document"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b' }}>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>File Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>File Size</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Uploaded On</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0f172a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {file.type === 'Image' ? (
                          <Image size={18} style={{ color: '#2563eb', flexShrink: 0 }} />
                        ) : (
                          <FileText size={18} style={{ color: '#ea580c', flexShrink: 0 }} />
                        )}
                        <span>{file.name}</span>
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px', color: '#475569' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#f1f5f9', fontSize: '11.5px', fontWeight: '600' }}>
                        {file.type}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px', color: '#64748b' }}>
                      {file.size}
                    </td>

                    <td style={{ padding: '14px 16px', color: '#64748b' }}>
                      {file.date}
                    </td>

                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => alert(`Downloading ${file.name}`)}
                          style={{ background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer', padding: '4px' }}
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(file.id)}
                          style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Site Blueprint or Document"
      >
        <form onSubmit={handleAddFile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              File Title / Blueprint Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Electrical_Layout_GroundFloor.pdf"
              value={newFileForm.name}
              onChange={(e) => setNewFileForm({ ...newFileForm, name: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Category
              </label>
              <select
                value={newFileForm.type}
                onChange={(e) => setNewFileForm({ ...newFileForm, type: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', background: '#fff' }}
              >
                <option value="PDF">Architectural Drawing (PDF)</option>
                <option value="CAD">Structural CAD (.dwg)</option>
                <option value="Sanction">Municipal Sanction Order</option>
                <option value="Image">Site Progress Photo</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Simulated File Size
              </label>
              <input
                type="text"
                value={newFileForm.size}
                onChange={(e) => setNewFileForm({ ...newFileForm, size: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>
          </div>

          <div style={{
            border: '2px dashed #cbd5e1',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center',
            background: '#f8fafc',
            color: '#64748b'
          }}>
            <UploadCloud size={32} style={{ color: '#2563eb', margin: '0 auto 8px auto' }} />
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Click or drag PDF/CAD files here</div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>Max file size: 50MB (PDF, DWG, PNG, JPG)</div>
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
              Upload to Drive
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
