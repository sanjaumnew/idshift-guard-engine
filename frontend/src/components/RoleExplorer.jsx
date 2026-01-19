import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Tooltip from '@mui/material/Tooltip';

const SeverityBadge = ({ severity = 'low' }) => {
  const styles = {
    critical: 'bg-red-100 text-red-700 border-red-300',
    high: 'bg-orange-100 text-orange-700 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-blue-100 text-blue-700 border-blue-300'
  };

  const cls = styles[severity] || styles.low;

  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${cls}`}>
      {severity.toUpperCase()}
    </span>
  );
};

const StatusIcon = ({ status = 'validated' }) => {
  if (status === 'escalated')
    return (
      <Tooltip title="Escalated Exception">
        <ErrorIcon fontSize="small" style={{ color: '#dc2626' }} />
      </Tooltip>
    );

  if (status === 'detected')
    return (
      <Tooltip title="Risk Detected">
        <HourglassEmptyIcon fontSize="small" style={{ color: '#f59e0b' }} />
      </Tooltip>
    );

  if (status === 'underReview')
    return (
      <Tooltip title="Under Review">
        <HourglassEmptyIcon fontSize="small" style={{ color: '#3b82f6' }} />
      </Tooltip>
    );

  return (
    <Tooltip title="Validated">
      <CheckCircleIcon fontSize="small" style={{ color: '#16a34a' }} />
    </Tooltip>
  );
};

const RoleExplorer = ({ identities = [] }) => {
  // Group identities by type → platform
  const grouped = identities.reduce((acc, id) => {
    const type = id.identityType || 'Unknown Type';
    const platform = id.attributes?.platform || 'Unspecified Platform';
    acc[type] = acc[type] || {};
    acc[type][platform] = acc[type][platform] || [];
    acc[type][platform].push(id);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-slate-800">
        Identity Role Explorer
      </h2>

      {identities.length === 0 ? (
        <div className="text-slate-500 text-sm">
          Connect identity sources to explore roles and access relationships.
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">

          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{
              '& .MuiTreeItem-label': {
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
              }
            }}
          >
            {Object.entries(grouped).map(([type, platforms]) => (
              <TreeItem
                key={type}
                nodeId={type}
                label={
                  <span className="font-semibold text-slate-900">
                    {type}
                  </span>
                }
              >
                {Object.entries(platforms).map(([platform, ids]) => (
                  <TreeItem
                    key={`${type}-${platform}`}
                    nodeId={`${type}-${platform}`}
                    label={
                      <span className="text-slate-700 font-medium">
                        {platform}
                      </span>
                    }
                  >
                    {ids.map((id) => (
                      <TreeItem
                        key={id.identityId}
                        nodeId={id.identityId}
                        label={
                          <div className="flex items-center justify-between gap-3 text-slate-700">
                            
                            {/* Identity name + email */}
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {id.attributes?.username || id.identityId}
                              </span>
                              <span className="text-xs text-slate-500">
                                {id.attributes?.email || 'no-email'}
                              </span>
                            </div>

                            {/* Severity */}
                            <SeverityBadge severity={id.severity} />

                            {/* Status */}
                            <StatusIcon status={id.status} />
                          </div>
                        }
                      />
                    ))}
                  </TreeItem>
                ))}
              </TreeItem>
            ))}
          </TreeView>
        </div>
      )}
    </div>
  );
};

export default RoleExplorer;
