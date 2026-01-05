
import React, { useState } from 'react';
import { ProductGroup } from '../../types';
import { useStockStore } from '../../state/stockStore';
import { Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';

interface TreeItemProps {
  group: ProductGroup;
  level: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ group, level }) => {
  const { selectedGroupId, setSelectedGroupId } = useStockStore();
  const [isOpen, setIsOpen] = useState(group.parentId === null); 

  const hasChildren = group.children && group.children.length > 0;
  const isSelected = selectedGroupId === group.id;

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = () => setSelectedGroupId(group.id);

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`flex items-center p-1.5 rounded-md cursor-pointer ${
          isSelected ? 'bg-primary text-white' : 'hover:bg-background/80'
        }`}
        style={{ paddingLeft: `${level * 1 + 0.5}rem` }}
      >
        <div onClick={(e) => { e.stopPropagation(); handleToggle(); }} className="mr-2 cursor-pointer">
            {hasChildren ? (
                isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            ) : <span className="w-[14px] inline-block"/>}
        </div>
        
        <div className="flex-shrink-0 mr-2">
            {isOpen ? <FolderOpen size={16} /> : <Folder size={16} />}
        </div>
        <span className="text-sm font-medium whitespace-nowrap">{group.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div className="mt-1">
          {group.children?.map((child) => (
            <TreeItem key={child.id} group={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const StockGroupTree: React.FC = () => {
  const productGroups = useStockStore((state) => state.productGroups);
  return (
    <div className="w-64 bg-card p-2 rounded-lg border border-border flex-shrink-0 overflow-y-auto">
      {productGroups.map((group) => (
        <TreeItem key={group.id} group={group} level={0} />
      ))}
    </div>
  );
};

export default StockGroupTree;
