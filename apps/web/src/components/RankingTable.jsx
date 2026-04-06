
import React from 'react';

const RankingTable = ({ data }) => {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-muted-foreground text-xs font-medium tracking-wider border-b border-border py-4 px-4 uppercase w-16">POS</th>
              <th className="text-muted-foreground text-xs font-medium tracking-wider border-b border-border py-4 px-4 uppercase w-20">#</th>
              <th className="text-muted-foreground text-xs font-medium tracking-wider border-b border-border py-4 px-4 uppercase">NOME</th>
              <th className="text-muted-foreground text-xs font-medium tracking-wider border-b border-border py-4 px-4 uppercase w-24">CAT</th>
              <th className="text-muted-foreground text-xs font-medium tracking-wider border-b border-border py-4 px-4 uppercase text-right">MV</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-muted-foreground">
                  Nenhum dado disponível.
                </td>
              </tr>
            ) : (
              data.map((entry, index) => {
                const isFirst = index === 0;
                const isSecond = index === 1;
                const isThird = index === 2;
                
                let posColor = 'text-foreground';
                if (isFirst) posColor = 'text-[hsl(var(--gold))]';
                else if (isSecond) posColor = 'text-[hsl(var(--silver))]';
                else if (isThird) posColor = 'text-[hsl(var(--bronze))]';

                return (
                  <tr 
                    key={entry.id} 
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className={`py-4 px-4 font-heading font-bold text-lg ${posColor}`}>
                      {entry.pos}
                    </td>
                    <td className="py-4 px-4 font-heading text-muted-foreground">
                      #{entry.kart}
                    </td>
                    <td className="py-4 px-4 font-bold uppercase tracking-wide text-foreground">
                      {entry.name}
                    </td>
                    <td className="py-4 px-4 text-xs font-bold tracking-wider text-primary uppercase">
                      {entry.category || '-'}
                    </td>
                    <td className="py-4 px-4 text-right font-heading text-sm text-muted-foreground">
                      {entry.mv || '--:--.---'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;
