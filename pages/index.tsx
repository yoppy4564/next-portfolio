import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div>
      <h1 style={{color: 'red', letterSpacing:'20px'}}>こんにちは</h1>
      <Link href="/contact">Contactページへ移動</Link>
    </div>
  )
}

export default Index