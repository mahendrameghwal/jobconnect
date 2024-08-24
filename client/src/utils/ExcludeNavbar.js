function ExcludeNavbar(pathname) {
    const excludedPaths = ['/dashboard','/sendsuccess','/resetrequest'];
    return !excludedPaths.some(path => pathname.includes(path));
  }

  export default ExcludeNavbar