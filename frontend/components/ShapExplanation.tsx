type Props = {
  shap: { token: string; impact: number }[]
}

export default function ShapExplanation({ shap }: Props) {
  if (!shap || shap.length === 0) return null

  const maxImpact = Math.max(...shap.map(s => Math.abs(s.impact)), 0.0001)

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Why AI?</h3>

      <div className="space-y-2">
        {shap.map((item, idx) => {
          const width = Math.abs(item.impact) / maxImpact * 100
          const isPositive = item.impact >= 0

          return (
            <div key={idx}>
              <div className="flex justify-between text-sm">
                <span className="font-mono">{item.token}</span>
                <span>{item.impact.toFixed(4)}</span>
              </div>

              <div className="h-2 bg-gray-700 rounded overflow-hidden">
                <div
                  className={`h-2 transition-all duration-700 ${
                    isPositive ? "bg-green-400" : "bg-red-400"
                  }`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
