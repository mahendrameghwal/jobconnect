function ExcludeFooter(pathname) {
    const excludedPaths = ['/dashboard', '/login', '/register','/createjob','/statistic','/create-company','/create-candidate','/chat','/profile','/sendsuccess'];
    return !excludedPaths.some(path => pathname.includes(path));
  }

  export default ExcludeFooter