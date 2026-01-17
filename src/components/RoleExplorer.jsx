// frontend/src/components/RoleExplorer.jsx
import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const SeverityBadge = ({ severity }) => {
  const color =
    severity === 'critical' ? '#7f1d1d' :
    severity === 'high' ? '#b91c1c' :
    severity === 'medium' ? '#ca8a04' : '#0ea5e9';

  return (
    <span
      style={{
        fontSize: 12,
        color,
        border: `1px solid ${color}`,
        borderRadius: 6,
        padding: '2px 6px'
      }}
    >
      {severity}
    </span>
  );
};

const StatusIcon = ({ status }) => {
  if (status === 'escalated') return <ErrorIcon style={{ color: '#dc2626' }} />;
  if (status === 'detected') return <HourglassEmptyIcon style={{ color: '#ca8a04' }} />;
  if (status === 'underReview') return <HourglassEmptyIcon style={{ color: '#0ea5e9' }} />;
  // Default success-like state
  return <CheckCircleIcon style={{ color: '#16a34a' }} />;
};

const RoleExplorer = ({ identities = [] }) => {
  // Group identities by type → platform
  const grouped = identities.reduce((acc, id) => {
    const type = id.identityType || 'unknown';
    const platform = id.attributes?.platform || 'Unspecified';
    acc[type] = acc[type] || {};
    acc[type][platform] = acc[type][platform] || [];
    acc[type][platform].push(id);
    return acc;
  }, {});

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Role Explorer (Identities by type and platform)</h2>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {Object.entries(grouped).map(([type, platforms]) => (
          <TreeItem key={type} nodeId={type} label={type}>
            {Object.entries(platforms).map(([platform, ids]) => (
              <TreeItem
                key={`${type}-${platform}`}
                nodeId={`${type}-${platform}`}
                label={platform}
              >
                {ids.map((id) => (
                  <TreeItem
                    key={id.identityId}
                    nodeId={id.identityId}
                    label={
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>
                          {id.attributes?.username || id.identityId}{' '}
                          <span style={{ fontSize: 12, color: '#64748b' }}>
                            ({id.attributes?.email || 'no-email'})
                          </span>
                        </span>
                        <SeverityBadge severity={id.severity} />
                        <StatusIcon status={id.status} />
                      </span>
                    }
                  />
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </div>
  );
};

export default RoleExplorer;