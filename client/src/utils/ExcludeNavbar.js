function ExcludeNavbar(pathname) {
    const excludedPaths = ['/dashboard','/sendsuccess','/resetrequest','/payment/success','/payment/failed','/login'];
    return !excludedPaths.some(path => pathname.includes(path));
  }

  export default ExcludeNavbar