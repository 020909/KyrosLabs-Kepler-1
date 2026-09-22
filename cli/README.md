# kepler CLI

Terminal front-end for **Kepler 1.1** (Kyros Labs). Same product surface as the site playground — typed allow / ask / deny — without writing Python each time.

## Install (Mac-safe pins)

```bash
cd cli
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
# Intel Mac tip if torch pulls too new a transformers:
pip install "torch==2.2.2" "numpy<2" "transformers>=4.48.0,<5"
```

## Use

```bash
kepler gate --command "rm -rf /"
kepler gate --command "git status"
kepler gate --tool http --url "https://hooks.example.com/x" --method POST
```

Full JSON:

```bash
kepler decide --state '{"tool":"shell","command":"git status","cwd":"/workspace"}' --pretty
```

Default model: `MAKALY/kepler-1.1`. Override with `--model /path/or/hf-id`.

## Website

Playground: https://kyroslabs.tech/playground  
Weights: https://huggingface.co/MAKALY/kepler-1.1
