import React from 'react';
import { X, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_URL } from "../../../../helpers/networt";

const BottomSheet = ({ 
  isOpen, 
  onClose, 
  recommendations, 
  onAddToCart, 
  selectedProduct 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-50 transform transition-all duration-300 ease-out shadow-2xl ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      } max-h-[80vh] md:max-h-[75vh]`}>
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        <div className="px-4 sm:px-6 pb-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 sm:mb-6 gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">✨</span>
                <h2 className="text-lg sm:text-xl font-bold truncate">Rekomendasi untuk Anda</h2>
              </div>
              {selectedProduct && (
                <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                  Berdasarkan <span className="font-medium text-slate-700">{selectedProduct.name}</span> yang baru ditambahkan
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Products Grid */}
          <ScrollArea className="h-[calc(80vh-240px)] sm:h-[400px] mb-4 sm:mb-6">
            {recommendations.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <ShoppingCart className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-500 text-sm">Tidak ada rekomendasi produk</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {recommendations.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-slate-200/50"
                  >
                    {/* Product Image */}
                    <div className="relative h-28 sm:h-32 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden group">
                      <img
                        src={product.foto ? `${API_URL}/images/${product.foto}` : "https://github.com/shadcn.png"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm mb-1.5 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      
                      <p className="text-xs text-slate-500 mb-2 line-clamp-2 min-h-[2rem]">
                        {product.deskripsi?.length > 50 
                          ? `${product.deskripsi.slice(0, 50)}...` 
                          : product.deskripsi || 'Tidak ada deskripsi'
                        }
                      </p>
                      
                      <Badge 
                        variant="outline" 
                        className="text-xs mb-3 bg-white border-slate-300"
                      >
                        {product.kategori}
                      </Badge>
                      
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-full">
                          Stok {product.stok}
                        </span>
                        <span className="font-bold text-sm text-primary">
                          Rp {product.harga?.toLocaleString('id-ID')}
                        </span>
                      </div>
                      
                      <Button
                        onClick={() => onAddToCart(product)}
                        size="sm"
                        className="w-full text-xs h-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <Plus size={14} className="mr-1" />
                        Tambah
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Footer Actions */}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;