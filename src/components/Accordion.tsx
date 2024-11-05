'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type AccordionItem = {
  title: string
  content: string
}

type AccordionProps = {
  items?: AccordionItem[]
}

const AccordionItem = ({ item, isOpen, onToggle }: { item: AccordionItem; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium">{item.title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-4">{item.content}</div>
      </div>
    </div>
  )
}

export default function Accordion({ items = [] }: AccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prevOpenItems =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter(item => item !== index)
        : [...prevOpenItems, index]
    )
  }

  if (!items || items.length === 0) {
    return <div className="text-center p-4">No accordion items to display.</div>
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openItems.includes(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  )
}