import { BasicCardPlan } from "./_components/basic-card-plan"
import { ProCardPlan } from "./_components/pro-card-plan"

export default function Plans() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3">
      <BasicCardPlan />
      <ProCardPlan />
    </div>
  )
}
