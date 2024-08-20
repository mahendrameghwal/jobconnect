import { motion } from 'framer-motion'
import React from 'react'

const VerifyCandidate = () => {
  return (
    <motion.div
    initial={{ opacity: 0, scale:1 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
    >VerifyCandidate</motion.div>
  )
}

export default VerifyCandidate