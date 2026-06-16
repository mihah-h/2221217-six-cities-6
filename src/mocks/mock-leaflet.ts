import { vi } from 'vitest';

export const mockMapInstance = {
  setView: vi.fn(),
};

export const mockMarker = {
  addTo: vi.fn(),
  remove: vi.fn(),
};

vi.mock('leaflet', () => ({
  default: {
    icon: vi.fn(() => ({})),
    map: vi.fn(() => mockMapInstance),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
    marker: vi.fn(() => mockMarker),
  },
}));
