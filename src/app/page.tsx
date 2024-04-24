import type React from 'react'
import { Filter } from '@/components/filter'

export default function Home(): React.JSX.Element {
  return (
    <div className="max-w-[1300px] mx-auto">
      <Filter />
    </div>
  );
}
