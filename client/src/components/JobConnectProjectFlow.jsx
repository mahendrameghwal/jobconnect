import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { FaUserCircle, FaBriefcase, FaSearch, FaFileAlt, FaPaperPlane, FaLock, FaComments, FaCreditCard } from 'react-icons/fa';

// Custom Node Component
const CustomNode = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'linear-gradient(145deg, #007dff, #007dff)',
        color: 'white',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '250px',
        border: '2px solid rgba(255,255,255,0.2)'
      }}
    >
      {data.icon}
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{data.label}</h3>
        {data.description && (
          <p style={{ margin: '5px 0 0', fontSize: '12px', opacity: 0.8 }}>
            {data.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// Custom Edge with Animation
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;

  return (
    <motion.path
      id={id}
      style={style}
      d={edgePath}
      markerEnd={markerEnd}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ 
        duration: 1.5, 
        ease: "easeInOut" 
      }}
      fill="none"
      stroke="#4a90e2"
      strokeWidth={3}
      strokeOpacity={0.7}
    />
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const JobConnectProjectFlow = () => {
  const initialNodes = [
    {
      id: 'project-overview',
      type: 'custom',
      position: { x: 500, y: 50 },
      data: { 
        label: 'JobConnect Platform', 
        icon: <FaBriefcase size={30} />,
        description: 'Connecting Talent with Opportunity'
      },
    },
    {
      id: 'user-types',
      type: 'custom',
      position: { x: 500, y: 250 },
      data: { 
        label: 'User Types', 
        icon: <FaUserCircle size={30} />,
        description: 'Candidates & Organizations'
      },
    },
    {
      id: 'candidate',
      type: 'custom',
      position: { x: 250, y: 450 },
      data: { 
        label: 'Candidate', 
        icon: <FaSearch size={30} />,
        description: 'Job Seekers Journey'
      },
    },
    {
      id: 'organization',
      type: 'custom',
      position: { x: 750, y: 450 },
      data: { 
        label: 'Organization', 
        icon: <FaBriefcase size={30} />,
        description: 'Hiring Managers Platform'
      },
    },
    {
      id: 'authentication',
      type: 'custom',
      position: { x: 500, y: 650 },
      data: { 
        label: 'Authentication', 
        icon: <FaLock size={30} />,
        description: 'Secure JWT & OAuth'
      },
    },
    {
      id: 'messaging',
      type: 'custom',
      position: { x: 250, y: 850 },
      data: { 
        label: 'Direct Messaging', 
        icon: <FaComments size={30} />,
        description: 'Real-time Communication'
      },
    },
    {
      id: 'subscription',
      type: 'custom',
      position: { x: 750, y: 850 },
      data: { 
        label: 'Subscription Management', 
        icon: <FaCreditCard size={30} />,
        description: 'Flexible Pricing Plans'
      },
    }
  ];

  const initialEdges = [
    { 
      id: 'overview-users', 
      source: 'project-overview', 
      target: 'user-types', 
      type: 'custom' 
    },
    { 
      id: 'users-candidate', 
      source: 'user-types', 
      target: 'candidate', 
      type: 'custom' 
    },
    { 
      id: 'users-organization', 
      source: 'user-types', 
      target: 'organization', 
      type: 'custom' 
    },
    { 
      id: 'auth-messaging', 
      source: 'authentication', 
      target: 'messaging', 
      type: 'custom' 
    },
    { 
      id: 'auth-subscription', 
      source: 'authentication', 
      target: 'subscription', 
      type: 'custom' 
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds));
  }, [setEdges]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ 
        height: '800px', 
        width: '100%', 
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}
    >
    <div className="container-lg px-4 w-5/6   mx-auto ">
    <div className="flex text-4xl max-md:text-3xl max-sm:text-2xl font-bold gap-x-3"><span className="dark:text-gray-50">Project</span><span className="text-blue-500 ">Overview</span></div>
    </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <MiniMap 
          nodeColor={(node) => '#4a90e2'} 
          nodeBorderColor="#fff"
        />
        <Background 
          variant="dots" 
          gap={24} 
          size={1} 
          color="#e0e0e0"
        />
      </ReactFlow>
    </motion.div>
  );
};

export default JobConnectProjectFlow;