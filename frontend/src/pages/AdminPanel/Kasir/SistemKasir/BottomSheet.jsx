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
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] z-50 transform transition-transform duration-300 max-h-[75vh] ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold mb-1">✨ Rekomendasi untuk Anda</h2>
              {selectedProduct && (
                <p className="text-sm text-slate-500">
                  Berdasarkan {selectedProduct.name} yang baru ditambahkan
                </p>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="rounded-full h-10 w-10"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Products Grid */}
          <ScrollArea className="h-[400px] mb-6">
            {recommendations.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <p className="text-slate-500">Tidak ada rekomendasi produk</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {recommendations.map((product) => (
                  <div key={product.id} className="bg-slate-50 rounded-lg overflow-hidden">
                    {/* Product Image */}
                    <div className="relative h-32 bg-slate-200">
                      <img
                        src={product.foto ? `${API_URL}/images/${product.foto}` : "https://github.com/shadcn.png"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                        {product.deskripsi?.length > 50 
                          ? `${product.deskripsi.slice(0, 50)}...` 
                          : product.deskripsi
                        }
                      </p>
                      
                      <Badge 
                        variant="outline" 
                        className="text-xs mb-3"
                      >
                        {product.kategori}
                      </Badge>
                      
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs text-slate-500">
                          Stok {product.stok}
                        </span>
                        <span className="font-bold text-sm text-primary">
                          Rp {product.harga?.toLocaleString('id-ID')}
                        </span>
                      </div>
                      
                      <Button
                        onClick={() => onAddToCart(product)}
                        size="sm"
                        className="w-full text-xs"
                      >
                        <Plus size={14} className="mr-1" />
                        Tambah ke Keranjang
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Footer Actions */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                Lanjut Belanja
              </Button>
              <Button
                onClick={onClose}
                className="w-full"
              >
                Lihat Keranjang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;