"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';


const navLinks = [
  { url: '/', title: 'Home' },
  { url: '/static', title: 'Static' },
  { url: '/dynamic', title: 'Dynamic' },
  { url: '/isr', title: 'ISR' },
  { url: '/topics/health', title: 'Health' },
  { url: '/topics/fitness', title: 'Fitness' },
  { url: '/topics/coding', title: 'Coding' },
]

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div style={{ 
      display: 'flex', 
      gap: '15px',
      background: 'darkblue',
      padding: '1rem',
      color: 'white',
      cursor: 'pointer',
    }}>
      {
        navLinks.map((each, index) => {
          return (
            <Link key={index} href={each.url}>
              <p style={{color: pathname === each.url ? 'yellow' : 'white'}}> 
                {each.title} 
              </p>
            </Link>
          )
        })
      }
    </div>
  )
}
