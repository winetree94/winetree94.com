import { execSync } from 'child_process';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import sirv from 'sirv';

export default function pagefind(): AstroIntegration {
  let outDir: string;
  return {
    name: 'pagefind',
    hooks: {
      'astro:config:setup': ({ config }) => {
        outDir = fileURLToPath(config.outDir);
      },
      'astro:server:setup': ({ server }) => {
        if (!outDir) {
          return;
        }
        const serve = sirv(outDir, {
          dev: true,
          etag: true,
        });
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/pagefind/')) {
            serve(req, res, next);
          } else {
            next();
          }
        });
      },
      'astro:build:done': () => {
        if (!outDir) {
          throw new Error('outDir not set');
        }
        const cmd = `npx pagefind --site "${outDir}"`;
        execSync(cmd, {
          stdio: [process.stdin, process.stdout, process.stderr],
        });
      },
    },
  };
}
