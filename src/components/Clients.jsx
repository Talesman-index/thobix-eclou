import React from 'react';
import { CLIENTS_LIST } from '../data/projects';

export default function Clients() {
  return (
    <section className="section-clients" id="clients">
      <div className="container">
        <div className="clients-big-title">CLIENTS DE PRESTIGE</div>
        <div className="clients-pills">
          {CLIENTS_LIST.map((client, index) => (
            <div key={index} className="client-pill">
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
