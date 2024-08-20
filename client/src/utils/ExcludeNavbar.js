function ExcludeNavbar(pathname) {
    const excludedPaths = ['/dashboard','/sendsuccess'];
    return !excludedPaths.some(path => pathname.includes(path));
  }

  export default ExcludeNavbar