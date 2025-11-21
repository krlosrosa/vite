// components/HomeMobile.tsx
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardTitle } from '@/_shared/components/ui/card'
import { Button } from '@/_shared/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { HeaderMobile } from '@/_shared/components/headerMobile'    

export function Home() {
  const menuItems = [
    {
      title: "Devoluções",
      description: "Processo completo de devolução de mercadorias",
      href: "/devolucao/demandas",
      icon: ArrowLeft,
      gradient: "from-primary to-primary/90",
      buttonClass: "bg-white text-primary hover:bg-white/90"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      {/* Header Mobile - sem botão de voltar na home */}
      <HeaderMobile 
        title="Operações do Armazém" 
        showBackButton={false}
      />

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Menu Grid */}
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <Card 
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 border-0 bg-linear-to-r ${item.gradient} shadow-lg hover:shadow-primary/20`}
            >
              <Link to={item.href}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-white mb-1">
                        {item.title}
                      </CardTitle>
                      <p className="text-white/90 text-xs mb-3">
                        {item.description}
                      </p>
                      <Button 
                        size="sm" 
                        className={`${item.buttonClass} font-medium px-4 py-1 rounded-lg text-sm`}
                      >
                        Acessar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}